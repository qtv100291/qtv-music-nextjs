// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";
import addfunc from "../../../utils/additionalFunction";

export default function handler(req, res) {
  if (req.method !== "GET") return;
  const params = { ...req.query };
  const filePath = path.join(process.cwd(), "data", "album.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  
  const albumPerPage = 12;
  const { filter: filterValue, sort: sortOrder, page: currentPage } = params;
  const filteredAlbum = addfunc.productFilter(data.musicData, filterValue);
  const totalAlbum = filteredAlbum.length;
  const sortedAlbum = addfunc.productSortBy(filteredAlbum, sortOrder);
  const albumDisplay = addfunc.albumDisplay(
    totalAlbum,
    currentPage,
    albumPerPage,
    sortedAlbum
  );
  res.status(200).json({totalAlbum,albumDisplay});
}
