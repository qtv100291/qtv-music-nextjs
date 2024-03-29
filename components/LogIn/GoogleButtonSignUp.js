import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { loginGoogle } from "../../services/googleService";
import styles from "./LogIn.module.scss";
import store from "../../store/configureStore";
import { openLoadingModal, closeLoadingModal } from "../../store/loadingModal";
import additionalFunctionDom from "../../utils/additionalFunctionDom";

const GoogleButtonSignIn = ({ windowWidth }) => {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_KEY);
    console.log(process.env.NEXT_PUBLIC_FB_APP_ID);
    const MySwal = withReactContent(Swal);
    async function handleCredentialResponse(response) {
      store.dispatch(openLoadingModal());
      // console.log(response.credential);
      try {
        await loginGoogle({ googleAccessToken: response.credential });
        MySwal.fire({
          icon: "success",
          html: "Đăng Nhập Thành Công",
          showConfirmButton: false,
          timer: 1250,
        }).then(() => {
          window.location = "/";
        });
      } catch (err) {
        if (err.response && err.response.status === 409) {
          additionalFunctionDom.fixBody();
          MySwal.fire({
            icon: "error",
            html: "Email Này Đã Được Sử Dụng",
          }).then(() => {
            additionalFunctionDom.releaseBody();
          });
        }
      }
      store.dispatch(closeLoadingModal());
    }
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GG_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        theme: "filled_blue",
        size: "large",
        width: windowWidth > 336 ? 320 : windowWidth * 0.95,
      } // customization attributes
    );
  }, [windowWidth]);

  return <div id="buttonDiv" className={styles.buttonGoogleLogin}></div>;
};

export default React.memo(GoogleButtonSignIn);
