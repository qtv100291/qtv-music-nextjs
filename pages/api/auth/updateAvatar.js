import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "PATCH") return;
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const { avatarLink } = req.body;
  const [schema, token] = req.headers.authorization.split(" ");
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
  try {
    const decode = jwt.verify(token, secretKey);
    const { id } = decode.data;
    for (let i = 0; i < data.users.length; i++) {
      if (data.users[i].id === id) {
        data.users[i].avatar = avatarLink;
        fs.writeFileSync(filePath, JSON.stringify(data))
        return res.status(200).json({message:"Avatar Updated"});
      }
    }
  } catch (err) {
    return res.status(403).json({message:err.message});
  }
  return res.status(404).json({message:"User not found"});
}