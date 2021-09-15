import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "./CarouselFade.module.scss";
import Link from "next/link";
import Banner1 from "../../assets/homepage-assets/banner.jpg";
import Banner2 from "../../assets/homepage-assets/banner2.jpg";
import Banner3 from "../../assets/homepage-assets/banner3.jpg";
import Image from "next/image";

const CarouselHomePage = () => {
  return (
    <Carousel
      fade={true}
      className={styles.carouselHomePage}
      indicators={false}
      interval={5500}
    >
      <Carousel.Item id={styles.carouselMainItem}>
        <Link href="/san-pham" passHref>
          <div className={styles.carouselBanner}>
            <div className={styles.carouselBannerPhoto}>
              <Image
                className="d-block w-100"
                src={Banner1}
                alt="First slide"
              />
            </div>
          </div>
        </Link>
        <Carousel.Caption>
          <h3>Let{`'`}s Rock On With QTV Music</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Link href="/blog/Chester-Bennington-một-cuộc-đời-để-nhớ-1" passHref>
          <div className={styles.carouselBanner}>
            <div className={styles.carouselBannerPhoto}>
              <Image
                className="d-block w-100"
                src={Banner2}
                alt="First slide"
              />
            </div>
          </div>
        </Link>
        <Carousel.Caption>
          <h3>Kỷ Niệm Ba Năm Ngày Mất Chester Bennington</h3>
          <p>
            Cùng QTV Music tìm hiểu về cuộc đời và sự nghiệp của ca sĩ chính ban
            nhạc Linkin Park{" "}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Link href="/san-pham/Human.-:II:-Nature-34" passHref>
          <div className={styles.carouselBanner}>
            <div className={styles.carouselBannerPhoto}>
              <Image
                className="d-block w-100"
                src={Banner3}
                alt="First slide"
              />
            </div>
          </div>
        </Link>
        <Carousel.Caption>
          <h3>Human. :II: Nature</h3>
          <p>
            Album thứ chín của ban nhạc symphonic metal Nightwish đã có mặt tại
            QTV Music
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselHomePage;
