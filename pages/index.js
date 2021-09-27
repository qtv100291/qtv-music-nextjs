import HomePage from "../components/HomePage";
import { getAlbum } from "../services/albumServiceHomePage";

function HomePagePage(props) {
  return <HomePage {...props}/>;
}

export async function getStaticProps() {
  const promise_1 = getAlbum(["5", "10", "14", "33"]);
  const promise_2 = getAlbum(["6", "32", "26", "18"]);
  const promise_3 = getAlbum(["23"]);
  return Promise.all([promise_1, promise_2, promise_3]).then((values) => {
    return {
      props:{
        vietnameseAlbum: values[0],
        internationalAlbum: values[1],
        albumOfTheWeek: values[2],
      }
    }
  });
}

export default HomePagePage;
