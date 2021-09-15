import fs from "fs";
import path from "path";
import addfunc from "../../../utils/additionalFunction";

export default function handler(req, res) {
  if (req.method !== "GET") return;
  const filePath = path.join(process.cwd(), "data", "album.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const vietnameseAlbums = addfunc.filterMusic("Việt Nam", data.musicData);
  const internationalAlbums = addfunc.filterMusic("Quốc Tế", data.musicData);
  res.status(200).json({ vietnameseAlbums, internationalAlbums });
}
