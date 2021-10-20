import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserInformation from "./UserInformation";
import UserTradeHistory from "./UserTradeHistory";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import styles from "./Account.module.scss";
import { useState } from "react";
import { userData, updateAvatar } from "../../store/authentication";
import { useSelector, useDispatch } from "react-redux";
import { updateAvatarUser } from "../../services/updateService";
import { useRouter } from "next/router";
import Image from "next/image";
import ProtectedRoute from "../ProtectedRoute";
import { deleteCookie } from "../../utils/cookie";
import spinIcon from "../../assets/homepage-assets/Rolling-1s-64px.gif";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import Button from "react-bootstrap/Button";

const Account = ({ activeTab }) => {
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isOpenModalUpload, setIsOpenModalUpload] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { name, avatar, id } = useSelector(userData);

  const handleChangeTab = (id) => {
    if (id === activeTab) return;
    else {
      if (id === 1) router.push("/account/thong-tin-tai-khoan");
      else router.push("/account/lich-su-giao-dich");
    }
  };

  const handleLogOut = () => {
    deleteCookie("token_qtv");
    deleteCookie("refreshToken_qtv");
    window.location = "/";
  };

  const uploadAvatarToServer = async ({ currentTarget: input }) => {
    setIsOpenModalUpload(false);
    document.querySelector("#navbar-desktop").style.paddingRight = "0px";
    const formData = new FormData();
    if (input.files.length === 0) return;
    setIsLoadingAvatar(true);
    const file = input.files[0];
    formData.append("upload_file", file);
    try {
      await updateAvatarUser(formData)
      // const { data } = await updateAvatarUser(formData);
      // const urlAvatar = data.urlAvatar;
      // dispatch(updateAvatar(urlAvatar));
    } catch (err) {
      if (err.response && err.response.status === 413) {
        const MySwal = withReactContent(Swal);
        additionalFunctionDom.fixBody();
        MySwal.fire({
          icon: "error",
          text: "Kích thước file vượt quá 1 MB",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          additionalFunctionDom.releaseBody();
          setIsLoadingAvatar(false);
        });
      }
      if (err.response && err.response.status === 406) {
        const MySwal = withReactContent(Swal);
        additionalFunctionDom.fixBody();
        MySwal.fire({
          icon: "error",
          text: "File không phải định dạng ảnh",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          additionalFunctionDom.releaseBody();
          setIsLoadingAvatar(false);
        });
      }
    }
  };

  const inputButton = useRef();

  const uploadImageFile = () => {
    inputButton.current.click();
  };

  const handleLoadingAvatar = () => {
    if (isLoadingAvatar) {
      const MySwal = withReactContent(Swal);
      additionalFunctionDom.fixBody();
      MySwal.fire({
        icon: "success",
        text: "Tải Lên Avatar Thành Công",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        additionalFunctionDom.releaseBody();
      });
      setIsLoadingAvatar(false);
    }
  };

  return (
    <main className={styles.accountMain}>
      <Modal
        centered={true}
        show={isOpenModalUpload}
        onHide={() => {
          setIsOpenModalUpload(false);
          document.querySelector("#navbar-desktop").style.paddingRight = "0px";
        }}
      >
        <ModalBody style={{ padding: "30px", textAlign:"center" }}>
          <p style={{ textAlign: "center", marginBottom:"20px" }}>
            Vui lòng chọn file ảnh với kích thước không quá 1 MB
          </p>
          <Button variant="primary" onClick={uploadImageFile} style={{}}>
            <FontAwesomeIcon
              icon={["fas", "upload"]}
              style={{ fontSize: "120%", color: "white", marginRight: "5px" }}
            />{" "}
            Tải Lên
          </Button>
        </ModalBody>
      </Modal>
      <div
        className={`${styles.accountContainer} d-flex justify-content-between`}
      >
        <section className={styles.accountSideBar}>
          <div
            className={`${styles.accountMenuMemberGeneral} d-flex align-items-center`}
          >
            <div className={styles.avatarContainer}>
              <div
                className={`${styles.avatarPicture} d-flex align-items-center justify-content-center`}
                onClick={() => {
                  if (isLoadingAvatar) return;
                  let scrollBarWidth;
                  if (document.body.offsetHeight > window.innerHeight) {
                    scrollBarWidth =
                      window.innerWidth - document.body.clientWidth;
                  } else scrollBarWidth = 0;
                  if (document.querySelector("#navbar-desktop") !== null) {
                    document.querySelector(
                      "#navbar-desktop"
                    ).style.paddingRight = `${scrollBarWidth}px`;
                  }
                  setIsOpenModalUpload(true);
                }}
              >
                {isLoadingAvatar && (
                  <div className={styles.avatarSpinLoading}>
                    <Image loading="eager" alt="Avatar" src={spinIcon} />
                  </div>
                )}
                {avatar ? (
                  <Image
                    loading="eager"
                    src={avatar}
                    alt="avatar"
                    layout="fill"
                    onLoad={handleLoadingAvatar}
                  />
                ) : (
                  <FontAwesomeIcon icon="plus" />
                )}
              </div>
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                ref={inputButton}
                name="upload_file"
                onChange={uploadAvatarToServer}
              />
            </div>
            <div className={styles.welcomeMember}>
              Xin Chào
              <strong className={styles.memberName} title={name}>
                {" "}
                {name}
              </strong>
            </div>
          </div>
          <ul className={styles.accountMenuSidebar}>
            <li
              className={
                activeTab === 1
                  ? `account-menu-info ${styles.activeMenu}`
                  : "account-menu-info"
              }
              onClick={() => handleChangeTab(1)}
            >
              <FontAwesomeIcon icon="user-alt" />
              Thông Tin Tài Khoản
            </li>
            <li
              className={
                activeTab === 2
                  ? `account-menu-history-trade ${styles.activeMenu}`
                  : "account-menu-history-trade"
              }
              onClick={() => handleChangeTab(2)}
            >
              <FontAwesomeIcon icon="bookmark" />
              Lịch Sử Giao Dịch
            </li>
          </ul>
          <div className={styles.logOutButton} onClick={handleLogOut}>
            Đăng Xuất
          </div>
        </section>
        <section className={styles.accountContent}>
          {activeTab === 1 ? <UserInformation /> : <UserTradeHistory />}
        </section>
      </div>
    </main>
  );
};

export default ProtectedRoute(Account);
