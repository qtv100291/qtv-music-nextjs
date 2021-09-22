import React, { useEffect } from "react";
import styles from "./Blog.module.scss";
import Link from "next/link";
import item1 from "../../assets/blog/Chester-Bennington.jpg";
import item2 from "../../assets/blog/finland.jpeg";
import item3 from "../../assets/blog/hac-san-1.jpg";
import item4 from "../../assets/blog/thrash-metal.jpg";
import calendar from "../../assets/blog/calendar-1.png";
import pen from "../../assets/blog/pen-1.png";
import BreadCrumb from "../Common/BreadCrumb";
import Image from "next/image";
import Head from "next/head";

const Blog = ({ onLoadingScreen }) => {
  const title_1 = "Chester Bennington một cuộc đời để nhớ";
  const title_2 = "Đô Thị Phần Lan Trong Cuộc Đua Giành Ngôi Vị Thủ Đô Metal";
  const title_3 = "Ban Nhạc Hạc San Ra Mắt Album Hồn Trăng Máu";
  const title_4 = "Những Điều Thú Vị Về Tứ Trụ Thrash Metal";

  useEffect(() => {
    // document.title = "Blog";
    // onLoadingScreen();
    // additionalFunctionDom.fixBody();
    // setTimeout(() => {
    //   onLoadingScreen();
    //   additionalFunctionDom.releaseBody();
    // }, 1200);
  }, []);

  return (
    <main className={styles.blogSection}>
      <Head>
        <title>Blog</title>
      </Head>
      <BreadCrumb
        titleParent="Blog"
        backgroundImage={`url(/blog-banner.jpg)`}
      />
      <section className={styles.articleSection}>
        <div
          className={`${styles.articleItem} d-flex justify-content-between flex-row-reverse`}
        >
          <div className={styles.articleItemPhoto}>
            <div className={styles.articleItemPhotoContainer}>
              <Image
                loading="eager"
                src={item1}
                alt="chester-bennington"
                height={410}
                width={575}
              />
            </div>
          </div>
          <div className={styles.articleDescription}>
            <h2 className={styles.articleDescriptionTitle}>
              Chester Bennington - Một Cuộc Đời Để Nhớ
            </h2>
            <div className={`${styles.articleDescriptionInfo} d-flex`}>
              <div
                className={`${styles.articleItemDate} d-flex justify-content-between align-items-center`}
              >
                <Image loading="eager" src={calendar} alt="lịch" />
                <p>20 Tháng 07, 2021</p>
              </div>
              <div
                className={`${styles.articleItemAuthor} d-flex justify-content-between align-items-center`}
              >
                <Image loading="eager" src={pen} alt="tác giả" />
                <p>Admin</p>
              </div>
            </div>
            <div className={styles.articleDescriptionSummary}>
              <p>
                Ngày 20 tháng 07 năm 2017 , Chester Bennington chấm dứt cuộc đời
                của mình bằng cách treo cổ tự tử, để lại sự nuối tiếc và đau
                buồn trong lòng các fan hâm mộ của ban nhạc LinKin Park. Hãy
                cùng QTV Music điểm lại những sự kiện tiêu biểu trong cuộc đời
                thành công nhưng cũng ẩn chứa rất nhiều góc khuất của giọng ca
                Nu metal này.
              </p>
            </div>
            <Link href={`/blog/${title_1.split(" ").join("-")}-1`} passHref>
              <a>
                <div
                  className={`${styles.buttonAccessArticle} d-flex justify-content-center align-items-center`}
                >
                  Đọc Tiếp
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className={`${styles.articleItem} d-flex justify-content-between`}>
          <div className={styles.articleItemPhoto}>
            <div className={styles.articleItemPhotoContainer}>
              <Image loading="eager" src={item2} alt="Metal" />
            </div>
          </div>
          <div className={styles.articleDescription}>
            <h2 className={styles.articleDescriptionTitle}>
              Đô Thị Phần Lan Trong Cuộc Đua Giành Ngôi Vị Thủ Đô Metal
            </h2>
            <div className={`${styles.articleDescriptionInfo} d-flex`}>
              <div
                className={`${styles.articleItemDate} d-flex justify-content-between align-items-center`}
              >
                <Image loading="eager" src={calendar} alt="lịch" />
                <p>02 Tháng 07, 2021</p>
              </div>
              <div
                className={`${styles.articleItemAuthor} d-flex justify-content-between align-items-center`}
              >
                <Image loading="eager" src={pen} alt="tác giả" />
                <p>Admin</p>
              </div>
            </div>
            <div className={styles.articleDescriptionSummary}>
              <p>
                Với số lượng ban nhạc chơi heavy metal trên đầu người nhiều hơn
                bất cứ nơi nào khác trên thế giới, Phần Lan đang nằm tại tâm
                điểm của cộng đồng metal trên khắp toàn cầu. Chúng ta cùng xem
                cách người ta xác định thành phố nào của Phần Lan đạt danh hiệu
                thủ đô Metal.
              </p>
            </div>
            <Link href={`/blog/${title_2.split(" ").join("-")}-2`} passHref>
              <a>
                <div
                  className={`${styles.buttonAccessArticle} d-flex justify-content-center align-items-center`}
                >
                  Đọc Tiếp
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div
          className={`${styles.articleItem} d-flex justify-content-between flex-row-reverse`}
        >
          <div className={styles.articleItemPhoto}>
            <div className={styles.articleItemPhotoContainer}>
              <Image loading="eager" src={item3} alt="Hac San" />
            </div>
          </div>
          <div className={styles.articleDescription}>
            <h2 className={styles.articleDescriptionTitle}>
              Ban Nhạc Hạc San ra mắt album “Hồn – Trăng – Máu”
            </h2>
            <div className={`${styles.articleDescriptionInfo} d-flex`}>
              <div
                className={`${styles.articleItemDate} d-flex justify-content-between align-items-center`}
              >
                <Image loading="eager" src={calendar} alt="lịch" />
                <p>25 Tháng 06, 2021</p>
              </div>
              <div
                className={`${styles.articleItemAuthor} d-flex justify-content-between align-items-center`}
              >
                <Image loading="eager" src={pen} alt="tác giả" />
                <p>Admin</p>
              </div>
            </div>
            <div className={styles.articleDescriptionSummary}>
              <p>
                Sau 5 năm kể từ album đầu tay “Sét Đánh Ngang Trời”, Hạc San mới
                quay trở lại cùng album mới “Hồn - Trăng - Máu”, lấy cảm hứng từ
                cuộc đời thi sĩ nổi tiếng Hàn Mặc Tử, là người khởi đầu cho dòng
                thơ lãng mạn của Việt Nam những năm đầu thế kỉ 20.
              </p>
            </div>
            <Link href={`/blog/${title_3.split(" ").join("-")}-3`} passHref>
              <a>
                <div
                  className={`${styles.buttonAccessArticle} d-flex justify-content-center align-items-center`}
                >
                  Đọc Tiếp
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className={`${styles.articleItem} d-flex justify-content-between`}>
          <div className={styles.articleItemPhoto}>
            <div className={styles.articleItemPhotoContainer}>
              <Image loading="eager" src={item4} alt="Thrash Metal" />
            </div>
          </div>
          <div className={styles.articleDescription}>
            <h2 className={styles.articleDescriptionTitle}>
              Những Điều Thú Vị Về “Tứ Trụ Thrash Metal”
            </h2>
            <div className={`${styles.articleDescriptionInfo} d-flex`}>
              <div
                className={`${styles.articleItemDate} d-flex justify-content-between align-items-center`}
              >
                <Image loading="eager" src={calendar} alt="lịch" />
                <p>08 Tháng 06, 2021</p>
              </div>
              <div
                className={`${styles.articleItemAuthor} d-flex justify-content-between align-items-center`}
              >
                <Image loading="eager" src={pen} alt="tác giả" />
                <p>Admin</p>
              </div>
            </div>
            <div className={styles.articleDescriptionSummary}>
              <p>
                Chắc hẳn mọi người đã quá quen thuộc với 4 “ông tướng” trong
                làng Thrash Metal: Metallica, Slayer, Megadeth và Anthrax, họ là
                những band đi đầu trong dòng nhạc Thrash và đã khẳng định được
                vị thế của mình từ những năm 80 cho đến tận ngày hôm nay.
              </p>
            </div>
            <Link href={`/blog/${title_4.split(" ").join("-")}-4`} passHref>
              <a>
                <div
                  className={`${styles.buttonAccessArticle} d-flex justify-content-center align-items-center`}
                >
                  Đọc Tiếp
                </div>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
