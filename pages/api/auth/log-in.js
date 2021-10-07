import fs from "fs";
import path from "path";
import { comparePassword } from "../../../utils/hashPassword";
import generateToken from "../../../utils/generateToken";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const { email, password } = req.body;
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].email === email) {
      if (data.users[i].platform !== "web"){
        return res.status(409).json({message : `Email này được liên kết với tài khoản ${data.users[i].platform}, xin hãy đăng nhập qua ${data.users[i].platform} `})
      }
      const isValid = await comparePassword(password, data.users[i].password);
      if (isValid) {
        const payload = {
          email,
          id: data.users[i].id,
        };
        const [tokenKey, refreshTokenKey] = generateToken(payload);
        data.users[i].refreshToken = refreshTokenKey
        fs.writeFileSync(filePath, JSON.stringify(data));
        return res
          .status(200)
          .json({ accessToken: tokenKey, refreshToken: refreshTokenKey });
      } else return res.status(401).json({ message: "Password incorrect" });
    }
  }
  res.status(404).json({ message: "User not found" });
}
