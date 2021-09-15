import React from "react";
import SwiperSliderArtist from "./SwiperSliderArtist";
import styles from './AlbumHomePage.module.scss';


const FamousArtist = ({ windowWidth }) => {
  return (
    <section className={styles.albumSection}>
      <div className={`${styles.albumTitle} d-flex align-items-center`}>
        <div className={styles.titlePoint}></div>
        <h2>Nghệ Sĩ Nổi Bật</h2>
      </div>
      <SwiperSliderArtist windowWidth={windowWidth} />
    </section>
  );
};

export default FamousArtist;
