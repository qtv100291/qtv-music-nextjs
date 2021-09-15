import React, { useCallback, useEffect } from "react";
import brokenGuitar from "../../assets/homepage-assets/broken-guitar.png";
import styles from "./NotFound.module.scss";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const NotFoundPage = () => {
  return (
    <main className={styles.notFoundMain}>
      <Head>
        <title>Không Tìm Thấy</title>
      </Head>
      <div
        className={`${styles.notFoundContainer} d-flex justify-content-center align-items-center`}
      >
        <div className={styles.notFoundPhoto}>
          <Image src={brokenGuitar} alt="broken-guitar" />
        </div>
        <div className={styles.notFoundMessenger}>
          <h2>404 MUSIC NOT FOUND</h2>
          <p>Không Có Tí Nhạc Nhẽo Nào Ở Đây Cả Đâu ...</p>

          <Link href="/" passHref>
            <a>
              <div className={styles.buttonHomepage}>Quay Lại Trang Chủ</div>
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
