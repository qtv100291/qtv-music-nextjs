import React, { Component } from "react";
import styles from "./BlogArticle.module.scss";
import Link from "next/link";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import Head from "next/head";
import articlePreprocessor from "../../utils/articlePreprocessor";
import Image from "next/image";

class BlogArticle extends Component {

  async componentDidMount() {
    // this.props.onLoadingScreen();
    // additionalFunctionDom.fixBody();
    // const articleId = addfunc.getAlbumId(this.props.location.pathname);
    // const { data : article } = await getArticle(articleId);
    // this.setState({ article })
    // document.title = article.title;
    // setTimeout( () => {
    //     this.props.onLoadingScreen();
    //     additionalFunctionDom.releaseBody();
    // },800)
    // try {
    //   const { data: article } = await getArticle(articleId);
    //   this.setState({ article });
    //   document.title = article.title;
    //   setTimeout(() => {
    //     this.props.onLoadingScreen();
    //     additionalFunctionDom.releaseBody();
    //   }, 800);
    // } catch (ex) {
    //   console.log(ex.response);
    //   if (ex.response && ex.response.status === 404) {
    //     this.props.onLoadingScreen();
    //     additionalFunctionDom.releaseBody();
    //     this.props.history.replace("/khong-tim-thay");
    //   }
    // }
  }

  // componentDidUpdate(prevProps) {
  //   if (
  //     addfunc.getAlbumId(prevProps.location.pathname) !==
  //     addfunc.getAlbumId(this.props.location.pathname)
  //   ) {
  //     this.componentDidMount();
  //   }
  // }

  render() {
    const { articleContent } = this.props
    const article_1 = {
      title: "Chester Bennington một cuộc đời để nhớ",
      id: 1,
      date: "20 Tháng 07, 2020",
    };
    const article_2 = {
      title: "Đô Thị Phần Lan Trong Cuộc Đua Giành Ngôi Vị Thủ Đô Metal",
      id: 2,
      date: "02 Tháng 07, 2020",
    };
    const article_3 = {
      title: "Ban Nhạc Hạc San Ra Mắt Album Hồn Trăng Máu",
      id: 3,
      date: "25 Tháng 06, 2020",
    };
    const article_4 = {
      title: "Những Điều Thú Vị Về Tứ Trụ Thrash Metal",
      id: 4,
      date: "08 Tháng 06, 2020",
    };
    const articleIndex = parseInt(articleContent.id);
    const articleTitles = [
      { ...article_1 },
      { ...article_2 },
      { ...article_3 },
      { ...article_4 },
    ];
    let relatedArticle;
    if (articleIndex) {
      relatedArticle = articleTitles.filter(
        (article, index) => index !== articleIndex - 1
      );
    } else return null;

    
    // console.log("article", articleContent)
    return (
      <main className={styles.blogDetail}>
        <Head>
          <title>QTV Music</title>
        </Head>
        <div className={styles.breadCrumb}>
          <Link href="/">Trang Chủ</Link> / <Link href="/blog">Blog</Link> /{" "}
          {articleContent.title}
        </div>
        <section className={styles.sectionArticleContent}>
          {Object.keys(articleContent).length !== 0 &&
            articlePreprocessor(articleContent)}
        </section>
        <section className={styles.sectionRelatedArticles}>
          <h2>Bài Viết Cùng Chuyên Mục: </h2>
          {relatedArticle &&
            relatedArticle.map((article) => (
              <div className={styles.relatedArticleItem} key={article.id}>
                <Link
                  href={`/blog/${article.title.split(" ").join("-")}-${
                    article.id
                  }`}
                >
                  {article.title}
                </Link>{" "}
                <span>{article.date}</span>
              </div>
            ))}
        </section>
      </main>
    );
  }
}

export default BlogArticle;
