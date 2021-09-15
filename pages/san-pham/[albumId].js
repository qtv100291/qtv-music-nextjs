import ProductDetail from "../../components/ProductDetail";
import { axiosInner } from "../../services/httpService";
import addfunc from "../../utils/additionalFunction";

function ProductDetailPage(props) {
  return <ProductDetail {...props} />;
}

export async function getServerSideProps(context) {
  const { albumId } = context.params;
  const productId = addfunc.getAlbumId(albumId);
  const response = axiosInner.get("/api/album/" + productId);
  const response_2 = axiosInner.post("/api/album/related-album", {
    albumId: productId,
  });

  return Promise.all([response, response_2]).then((values) => {
    return {
      props: {
        productContent: values[0].data,
        relatedAlbum: values[1].data,
      },
    };
  });
}

export default ProductDetailPage;
