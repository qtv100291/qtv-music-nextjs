import React, { useState } from "react";
import styles from "./NavbarIconItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { userData } from "../../store/authentication";
import { useSelector } from "react-redux";
import PopoverContent from "react-bootstrap/PopoverContent";
import Link from "next/link";
import { deleteCookie } from "../../utils/cookie";

const AccountIcon = () => {
  const { name } = useSelector(userData);
  const handleLogOut = () => {
    deleteCookie("token_qtv");
    deleteCookie("refreshToken_qtv");
    window.location = "/";
  };
  return (
    <div
      className={`user-icon-part ${styles.navbarIconItem}`}
      style={{ marginLeft: "25px" }}
    >
      <OverlayTrigger
        trigger="click"
        placement="bottom-end"
        rootClose
        overlay={
          <Popover style={{ borderRadius: "3px" }}>
            <PopoverContent style={{ padding: " 0" }}>
              <Link href="/account/thong-tin-tai-khoan" passHref>
                <a
                  className={styles.navBarPopoverItem}
                  onClick={() => {
                    console.log("hihihi");
                    document.body.click();
                  }}
                >
                  <FontAwesomeIcon
                    icon="user-alt"
                    style={{ marginRight: "5px" }}
                  />{" "}
                  Thông tin tài khoản
                </a>
              </Link>
              <Link href="/account/lich-su-giao-dich" passHref>
                <a
                  className={styles.navBarPopoverItem}
                  onClick={() => {
                    console.log("hihihi");
                    document.body.click();
                  }}
                >
                  <FontAwesomeIcon
                    icon="bookmark"
                    style={{ marginRight: "13px" }}
                  />
                  Lịch sử giao dịch
                </a>
              </Link>
              <a className={styles.navBarPopoverItem} onClick={handleLogOut}>
                <FontAwesomeIcon
                  icon={["fas", "sign-out-alt"]}
                  style={{ marginRight: "5px" }}
                />{" "}
                Đăng xuất
              </a>
            </PopoverContent>
          </Popover>
        }
      >
        <FontAwesomeIcon
          icon="user-check"
          className="real-font-awesome icon-navbar"
        />
      </OverlayTrigger>
    </div>
  );
};
export default AccountIcon;
