import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import generateToken from "../../../utils/generateToken";

export default function refreshToken(req, res) {
  if (req.method !== "POST") return;
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const secretRefreshKey = process.env.NEXT_PUBLIC_JWT_SECRET_REFRESH_KEY;
  const { refreshToken } = req.body;
  try {
    const decode = jwt.verify(refreshToken, secretRefreshKey);
    const { id } = decode.data;
    for (let i = 0; i < data.users.length; i++) {
      if (data.users[i].id === id) {
        if (data.users[i].refreshToken === refreshToken) {
          const payload = {
            email: data.users[i].email,
            id,
          };
          const [tokenKey, refreshTokenKey] = generateToken(payload);
          data.users[i].refreshToken = refreshTokenKey;
          fs.writeFileSync(filePath, JSON.stringify(data));
          return res
            .status(200)
            .json({ accessToken: tokenKey, refreshToken: refreshTokenKey });
        } else
          return res.status(401).json({ message: "Refresh Token not valid" });
      }
    }
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
}
