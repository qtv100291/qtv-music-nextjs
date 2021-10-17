import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { loginGoogle } from "../../services/googleService";
import styles from "./LogIn.module.scss";
import store from "../../store/configureStore";
import { openLoadingModal, closeLoadingModal } from "../../store/loadingModal";

const GoogleButtonSignIn = ({windowWidth}) => {
  useEffect(() => {
    console.log(windowWidth)
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
        console.log("error", err);
      }
      store.dispatch(closeLoadingModal());
    }
    google.accounts.id.initialize({
      client_id:
        "1020234478913-eptfd3u3qg9kds0ngb44tijnb77gojn8.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        theme: "filled_blue",
        size: "large",
        width: `${windowWidth > 336 ? 320 : windowWidth * 0.95}`,
      } // customization attributes
    );
  },[windowWidth])
  
  return ( 
    <div id="buttonDiv" className={styles.buttonGoogleLogin}></div>
   );
}
 
export default React.memo(GoogleButtonSignIn);