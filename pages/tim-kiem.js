import SearchPage from "../components/SearchPage";
import { axiosInner } from "../services/httpService";

export default function SearchPageHome(props) {
  return <SearchPage {...props}/>;
}

export async function getServerSideProps(context){
  const { query } = context
  console.log("query",query)
  const urlString = `/api/album/search?keyword=${query.search}`
  const response = await axiosInner.get(urlString)
  // console.log(response.data)
  return {
    props : {
      searchAlbumList: response.data,
      keyword: query.search
    }
  }
}