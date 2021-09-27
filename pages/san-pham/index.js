import Product from "../../components/Product";
import { axiosInner } from "../../services/httpService";

function ProductPage(props) {
  return <Product {...props} />;
}

export async function getServerSideProps(context) {
  const { query } = context;
  let queryString = "?";
  // console.log(query)
  for (let string in query) {
    queryString += `${string}=${query[string]}&`;
  }
  const urlString = `/api/album${queryString.slice(0, queryString.length - 1)}`;
  const responseAlbumList = axiosInner.get(urlString);
  const responseAlbumInfo = axiosInner.get("/api/album/info");
  return Promise.all([responseAlbumList, responseAlbumInfo]).then((values) => {
    return {
      props: {
        totalAlbum: values[0].data.totalAlbum,
        albums: values[0].data.albumDisplay,
        classificationAlbum: values[1].data,
        query,
      },
    };
  });
}

export default ProductPage;
