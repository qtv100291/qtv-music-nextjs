import React from "react";
import styles from "./AlbumOfTheWeek.module.scss";
import styles_1 from "./AlbumHomePage.module.scss";
import Link from "next/link";
import Image from "next/image";
import { style } from "dom-helpers";

const AlbumOfTheWeek = ({
  id,
  albumName,
  bandName,
  albumCover,
  price,
  description,
}) => {
  const imagePath = albumCover;
  const productPath =
    "/san-pham/" + (albumName && albumName.replace(/ /g, "-")) + "-" + id;
  return (
    <section className={styles_1.albumSection}>
      <div className={`${styles_1.albumTitle} d-flex align-items-center`}>
        <div className={styles_1.titlePoint}></div>
        <h2>Mỗi Tuần Một Album Với QTV Music</h2>
      </div>
      <div
        className={`${styles.albumTheWeekContainer} d-flex justify-content-between`}
      >
        <div className={styles.albumTheWeekPhoto}>
          {imagePath && (
            <Image src={imagePath} alt={albumName} width={580} height={580} />
          )}
        </div>
        <div className={styles.albumTheWeekContent}>
          <h3 className={styles.albumName}>{albumName}</h3>
          <h3 className={styles.albumBandName}>{bandName}</h3>
          <h3 className={styles.albumPrice}>{price} VND</h3>
          <div className={styles.albumTheWeekDescription}>
            {description &&
              description.map((des, index) => <p key={index}>{des}</p>)}
          </div>
          <Link href={productPath} passHref>
            <a>
              <div
                className={`${styles.buttonSeeMore} d-flex justify-content-center align-items-center`}
              >
                Xem Thêm
              </div>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AlbumOfTheWeek;
