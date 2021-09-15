import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "GET") return;
  const { idDistrict } = { ...req.query };
  // console.log(params)
  const filePath = path.join(process.cwd(), "data", "commune.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  // console.log(data.musicData.length)
  if (!idDistrict) {
    res.status(200).json(data.commune);
  } else {
    const communeSelected = data.commune.filter(commune => commune.idDistrict === idDistrict )
    res.status(200).json(communeSelected)
  }
}