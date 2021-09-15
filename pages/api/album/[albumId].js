import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "GET") return;
  const { albumId } = req.query;
  const filePath = path.join(process.cwd(), "data", "album.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  const albumSelected = data.musicData.filter((album) => album.id === albumId);
  if (albumSelected.length > 0) {
    res.status(200).json(albumSelected[0]);
  } else {
    res.status(200).json({message : "album not found"});
  }
}
