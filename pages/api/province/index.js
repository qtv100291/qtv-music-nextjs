import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "GET") return;
  // console.log(params)
  const filePath = path.join(process.cwd(), "data", "province.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  // console.log(data.musicData.length)
    res.status(200).json(data.province);
}