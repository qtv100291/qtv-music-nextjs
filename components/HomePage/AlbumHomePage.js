import React from "react";
import AlbumItem from "../common/albumItem";
import styles from "./AlbumHomePage.module.scss";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const AlbumHomePage = ({ title, album, onOpen, windowWidth }) => {
  const slidesPerView = (windowWidth) => {
    switch (true) {
      case windowWidth >= 1200:
        return 4;
      case 890 <= windowWidth && windowWidth <= 1200:
        return 3;
      case 580 <= windowWidth && windowWidth < 890:
        return 2;
      case windowWidth < 580:
        return 1;
      default:
        return 0;
    }
  };

  const slideNumber = slidesPerView(windowWidth);

  return (
    <section className={styles.albumSection}>
      <div className={`${styles.albumTitle} d-flex align-items-center`}>
        <div className={styles.titlePoint}></div>
        <h2>{title}</h2>
      </div>

      <div
        className={`${styles.albumContainer} d-flex justify-content-between`}
      >
        <Swiper spaceBetween={40} slidesPerView={slideNumber} navigation>
          {album.length > 0 &&
            album.map((albumItem) => (
              <SwiperSlide key={albumItem.id}>
                <AlbumItem {...albumItem} key={albumItem.id} onOpen={onOpen} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AlbumHomePage;
