import axios from "axios";
import BlogArticle from "../../components/BlogArticle";
import { axiosInner } from "../../services/httpService";
import addfunc from "../../utils/additionalFunction";

function BlogArticlePage(props) {
  return <BlogArticle {...props} />;
}

export async function getServerSideProps(context) {
  const { blogId } = context.params;
  const articleId = addfunc.getAlbumId(blogId);
  const response = await axiosInner('/api/article/' + articleId)
  const articleContent = response.data
  return {
    props : {
      articleContent
    }
  }
}

export default BlogArticlePage;
