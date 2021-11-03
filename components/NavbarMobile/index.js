import React, { useState } from "react";
import Link from "next/link";
import NavLink from "../Common/NavLink";
import SearchBar from "../NavBar/SearchBar";
import styles from "./NavbarMobile.module.scss";
import MenuIcon from "../NavBar/MenuIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import { useSelector } from "react-redux";
import { isLogged, userData } from "../../store/authentication";
import { getTotalCountItem } from "../../store/shoppingCart";
import { deleteCookie } from "../../utils/cookie";

const NavbarMobile = () => {
  const [isOpening, setIsOpening] = useState(false);

  const isLoggedUser = useSelector(isLogged);
  const { name } = useSelector(userData);
  const itemTotalNumber = useSelector(getTotalCountItem);

  const handleOpening = () => {
    additionalFunctionDom.fixBody();
    setIsOpening(true);
  };

  const handleClosing = () => {
    additionalFunctionDom.releaseBody();
    setIsOpening(false);
  };

  const handleLogOut = () => {
    setTimeout(() => {
      deleteCookie("token_qtv");
      deleteCookie("refreshToken_qtv");
      window.location = "/";
    }, 600);
  };

  return (
    <nav className={styles.navbarMobile}>
      <div
        className={`${styles.navbarMobileContainer} d-flex justify-content-between align-items-center`}
      >
        <Link href="/">
          <a className={styles.navbarLogoMobile}>
            <h1>QTV Music</h1>
          </a>
        </Link>
        <div
          className={`${styles.navbarMobileContainerItem} d-flex justify-content-between align-items-center`}
        >
          <SearchBar idInput={"search-bar-mobile"} />
          <span></span>
          <MenuIcon onOpening={handleOpening} />
        </div>
        <div
          className={
            isOpening
              ? `${styles.mobileNavbarBoard} ${styles.displaying}`
              : `${styles.mobileNavbarBoard}`
          }
          onClick={handleClosing}
        >
          <div className={styles.mobileNavbarBoardContent}>
            <div className={`${styles.mobileNavbarItem} ${styles.logIn}`}>
              {isLoggedUser ? (
                <Link href="/account/thong-tin-tai-khoan">
                  <a>
                    <FontAwesomeIcon
                      icon="user"
                      className={styles.iconNavMobile}
                    />
                    Chào {name}
                  </a>
                </Link>
              ) : (
                <Link href="/dang-nhap">
                  <a>
                    <FontAwesomeIcon
                      icon="user"
                      className={styles.iconNavMobile}
                    />{" "}
                    Đăng Nhập
                  </a>
                </Link>
              )}
            </div>
            <div className={styles.mobileNavbarItem}>
              <Link href="/gio-hang">
                <a>
                  <FontAwesomeIcon
                    icon="shopping-bag"
                    className={styles.iconNavMobile}
                  />{" "}
                  Giỏ Hàng <span>{itemTotalNumber}</span>
                </a>
              </Link>
            </div>
            <div className={styles.mobileNavbarItem}>
              <NavLink exact={true} href="/">
                <FontAwesomeIcon icon="home" className={styles.iconNavMobile} />{" "}
                Trang Chủ
              </NavLink>
            </div>
            <div className={styles.mobileNavbarItem}>
              <NavLink href="/san-pham">
                <FontAwesomeIcon
                  icon="compact-disc"
                  className={styles.iconNavMobile}
                />{" "}
                Sản Phẩm
              </NavLink>
            </div>
            <div className={styles.mobileNavbarItem}>
              <NavLink href="/blog">
                <FontAwesomeIcon
                  icon="bookmark"
                  className={styles.iconNavMobile}
                />{" "}
                Blog
              </NavLink>
            </div>
            <div className={styles.mobileNavbarItem}>
              <NavLink href="/lien-he">
                <FontAwesomeIcon
                  icon="phone-alt"
                  className={styles.iconNavMobile}
                />{" "}
                Liên Hệ
              </NavLink>
            </div>
            {isLoggedUser && (
              <div className={styles.mobileNavbarItem} onClick={handleLogOut}>
                <a>
                  <FontAwesomeIcon
                    icon={["fas", "sign-out-alt"]}
                    className={styles.iconNavMobile}
                  />{" "}
                  Đăng Xuất
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMobile;
