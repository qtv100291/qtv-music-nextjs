import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <nav
        className={`${styles.footerDesktop} d-flex justify-content-between align-items-center`}
      >
        <div
          className={`${styles.footerContainer} d-flex justify-content-between align-items-center`}
        >
          <Link  href="/" passHref>
            <h1 className={styles.footerLogo}>QTV Music</h1>
          </Link>
          <div className={styles.footerPage}>
            <Link href="/huong-dan-mua-hang">
              <a className={styles.footerPageItem} >Hướng Dẫn Mua Hàng</a> 
            </Link>
            <Link  href="/dieu-khoan-dich-vu">
              <a className={styles.footerPageItem}>Điều Khoản Dịch Vụ</a> 
            </Link>
          </div>
          <div className={`${styles.footerIcon} d-flex`}>
            <Link href="https://www.facebook.com/" passHref>
              <a style={{ color: "#4267b2" }} title="facebook">
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </a>
            </Link>
            <Link href="https://twitter.com/home" passHref>
              <a title="twitter" style={{ color: "#55ACEE" }}>
                <FontAwesomeIcon icon={["fab", "twitter-square"]} />
              </a>
            </Link>
            <Link href="https://www.instagram.com/" passHref>
              <a title="instagram" style={{ color: "#f04e40" }}>
                <FontAwesomeIcon icon={["fab", "instagram"]} />
              </a>
            </Link>
            <Link href="https://www.youtube.com/" passHref>
              <a title="youtube" style={{ color: "red" }}>
                <FontAwesomeIcon icon={["fab", "youtube"]} />
              </a>
            </Link>
          </div>
        </div>
      </nav>
      <div
        className={`${styles.footerAboutWebsite} d-flex justify-content-center`}
      >
        <h5>QTV Music @ 2021</h5>
      </div>
    </footer>
  );
};
export default Footer;
