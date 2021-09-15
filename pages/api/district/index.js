import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "GET") return;
  const { idProvince } = { ...req.query };
  // console.log(params)
  const filePath = path.join(process.cwd(), "data", "district.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  // console.log(data.musicData.length)
  if (!idProvince) {
    res.status(200).json(data.district);
  } else {
    const districtSelected = data.district.filter(district => district.idProvince === idProvince )
    res.status(200).json(districtSelected)
  }
}