import fs from "fs";
import path from "path";
import _ from "lodash";

export default function handler(req, res) {
  if (req.method !== "POST") return;
  const { albumId } = req.body ;
  const filePath = path.join(process.cwd(), "data", "album.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  let randomValueBand, randomValueCountry;
  const productAlbum = data.musicData.find((album) => album.id === albumId);
  const bandName = productAlbum.bandName;
  let albumBand = data.musicData.filter(
    (album) => album.bandName === bandName
  );
  const countryOfAlbum = albumBand[0].country;
  let albumCountry = data.musicData.filter(
    (album) => album.country === countryOfAlbum
  );
  if (albumBand.length >= 3) randomValueBand = 2;
  else randomValueBand = albumBand.length - 1;
  randomValueCountry = 4 - randomValueBand;
  albumBand = albumBand.filter((album) => album.id !== albumId);
  albumCountry = albumCountry.filter(
    (albumCountry) => albumCountry.bandName !== bandName
  );
  const randomAlbumBand = _.sampleSize(albumBand, randomValueBand);
  const randomAlbumCountry = _.sampleSize(albumCountry, randomValueCountry);
  const albumRelated = [...randomAlbumBand, ...randomAlbumCountry];
  res.status(200).json(albumRelated);
}
