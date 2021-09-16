import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "GET") return;
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const [schema, token] = req.headers.authorization.split(" ");
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  try {
    const decode = jwt.verify(token, secretKey);
    const { id } = decode.data;
    for (let i = 0; i < data.users.length; i++) {
      if (data.users[i].id === id) {
        const userData = { ...data.users[i] };
        delete userData.password;
        res.status(200).json(userData);
      }
    }
  } catch (err) {
    res.status(401).json({message:err.message});
  }
}
