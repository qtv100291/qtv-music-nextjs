import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserInformation from "./UserInformation";
import UserTradeHistory from "./UserTradeHistory";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import styles from "./Account.module.scss";
import { useState } from "react";
import storageRef from "../../services/firebaseStorage";
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

const Account = ({ activeTab }) => {
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  useEffect(() => {
    // onOpenLoadingScreen();
    additionalFunctionDom.fixBody();
    setTimeout(() => {
      // onCloseLoadingScreen();
      additionalFunctionDom.releaseBody();
    }, 1200);
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const { name, avatar, id } = useSelector(userData);

  const handleChangeTab = (id) => {
    if (id === activeTab) return;
    else {
      if (id === 1) router.push("/tai-khoan/thong-tin-tai-khoan");
      else router.push("/tai-khoan/lich-su-giao-dich");
    }
  };

  const handleLogOut = () => {
    deleteCookie("token_qtv");
    deleteCookie("refreshToken_qtv");
    window.location = "/";
  };

  const uploadAvatarToServer = async ({ currentTarget: input }) => {
    const userAvatarFolderRef = storageRef.child("userAvatar");
    const userAvatarRef = userAvatarFolderRef.child(`${id}-avatar`);
    if (avatar) userAvatarRef.delete();
    if (input.files.length === 0) return;
    setIsLoadingAvatar(true)
    const file = input.files[0];
    await userAvatarRef.put(file);
    let urlAvatar;
    await userAvatarRef.getDownloadURL().then((url) => (urlAvatar = url));
    dispatch(updateAvatar(urlAvatar));
    updateAvatarUser(urlAvatar);
  };

  const inputButton = useRef();

  const uploadImageFile = () => {
    inputButton.current.click();
  };

  const handleLoadingAvatar = () => {
    if (isLoadingAvatar) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: "success",
        text: "Tải Lên Avatar Thành Công",
        showConfirmButton: false,
        timer: 1250,
      });
      setIsLoadingAvatar(false);
    }
  };

  return (
    <main className={styles.accountMain}>
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
                onClick={uploadImageFile}
              >
                {isLoadingAvatar && (
                  <div className={styles.avatarSpinLoading}>
                    <Image alt="Avatar" src={spinIcon} />
                  </div>
                )}
                {avatar ? (
                  <Image
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
