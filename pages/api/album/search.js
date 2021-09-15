import fs from "fs";
import path from "path";
import addfunc from "../../../utils/additionalFunction";

export default function handler(req, res) {
  if (req.method !== "GET") return;
  const { keyword } = req.query;
  console.log("keyword", keyword);
  const filePath = path.join(process.cwd(), "data", "album.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const filteredAlbum = addfunc.searchAlbum(keyword, data.musicData);
  // console.log("filteredalbum",filteredAlbum)
  res.status(200).json(filteredAlbum);
}