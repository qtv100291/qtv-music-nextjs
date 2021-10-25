import HomePage from "../components/HomePage";
import { getAlbum } from "../services/albumServiceHomePage";
import fs from "fs";
import path from "path";

function HomePagePage(props) {
  return <HomePage {...props} />;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "album.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  const vietnameseAlbum = data.musicData.filter((album) =>
    ["5", "10", "14", "33"].includes(album.id)
  );
  const internationalAlbum = data.musicData.filter((album) =>
    ["6", "32", "26", "18"].includes(album.id)
  );
  const albumOfTheWeek = data.musicData.filter((album) =>
    ["23"].includes(album.id)
  );

  return {
    props: {
      vietnameseAlbum,
      internationalAlbum,
      albumOfTheWeek,
    },
  };
}

export default HomePagePage;
