import React from "react";
import Form from "../Common/form";
import styles from "./LogIn.module.scss";
import authService from "../../services/loginService";
import Link from "next/link";
import Head from "next/head";
import { withRouter } from "next/router";
import Spinner from "react-bootstrap/Spinner";
import UnseenRoute from "../UnseenRoute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginFacebook } from "../../services/facebookService";
import { loginGoogle } from "../../services/googleService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import { connect } from "react-redux";
import { openLoadingModal, closeLoadingModal } from "../../store/loadingModal";

const mapDispatchToProps = (dispatch) => ({
  openLoadingModalPage: () => {
    additionalFunctionDom.fixBody();
    dispatch(openLoadingModal());
  },
  closeLoadingModalPage: function () {
    additionalFunctionDom.releaseBody();
    dispatch(closeLoadingModal());
    console.log("inside");
  },
});

class LogIn extends Form {
  state = {
    data: {
      emailLogIn: "user@gmail.com",
      passwordLogIn: "123456",
    },
    errors: {},
    serverError: "",
    disabled: false,
    isLoading: false,
  };

  inputCheck = {
    emailLogIn: "emailCheck",
  };

  componentDidMount() {
    const MySwal = withReactContent(Swal);
    async function handleCredentialResponse(response) {
      this.props.openLoadingModalPage();
      console.log("Encoded JWT ID token: " + response.credential);
      try {
        await loginGoogle({ googleAccessToken: response.credential });
        this.props.closeLoadingModalPage();
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
    }
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "1020234478913-eptfd3u3qg9kds0ngb44tijnb77gojn8.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "filled_blue", size: "large", width: "320" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }

  doSubmit = async () => {
    const MySwal = withReactContent(Swal);
    this.setState({ isLoading: true, disabled: true });
    try {
      const { data: user } = this.state;
      await authService.login(user);
      MySwal.fire({
        icon: "success",
        html: "Đăng Nhập Thành Công",
        showConfirmButton: false,
        timer: 1250,
      }).then(() => {
        window.location = "/";
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const serverError = "Mật khẩu không chính xác";
        this.setState({ serverError });
      }
      if (ex.response && ex.response.status === 404) {
        const serverError = "Tài khoản không tồn tại";
        this.setState({ serverError });
      }
      this.setState({ disabled: false, isLoading: false });
    }
    this.setState({ disabled: false, isLoading: false });
  };

  hehe = () => {
    this.props.closeLoadingModalPage();
  };

  loginByFacebook = async () => {
    this.props.openLoadingModalPage();
    const MySwal = withReactContent(Swal);
    FB.login(
      async function (response) {
        const { authResponse } = response;
        console.log(authResponse);
        const data = {
          accessToken: authResponse.accessToken,
          userID: authResponse.userID,
        };
        try {
          await loginFacebook(data);
          this.hehe();
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
      },
      { scope: "email " }
    );
  };

  handleToggle = (e) => {
    e.preventDefault();
    this.props.router.replace("/dang-ky");
  };

  render() {
    const buttonLoginGoogle = document.getElementById("buttonDiv");
    if (buttonLoginGoogle) {
      const MySwal = withReactContent(Swal);
      async function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
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
      }
      google.accounts.id.initialize({
        client_id:
          "1020234478913-eptfd3u3qg9kds0ngb44tijnb77gojn8.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "filled_blue", size: "large", width: "320" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
    return (
      <main className={styles.logInSection}>
        <Head>
          <title>Đăng Nhập</title>
        </Head>
        <section className={styles.logInContainer}>
          <h2>ĐĂNG NHẬP</h2>
          {this.state.serverError && (
            <div className={styles.validFeedback}>{this.state.serverError}</div>
          )}
          <form onSubmit={this.handleSubmit} className={styles.logInForm}>
            {this.renderInputType2("emailLogIn", "Email Đăng Nhập")}
            {this.renderInputType2(
              "passwordLogIn",
              "Mật Khẩu Đăng Nhập",
              "password"
            )}
            <button type="submit" disabled={this.state.disabled}>
              {this.state.isLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}{" "}
              &nbsp; Đăng Nhập
            </button>
          </form>
          <div
            className={`${styles.lineSeparated} d-flex justify-content-center align-items-center`}
          >
            <div className={styles.lineSeparated__part}></div>
            <span className={styles.lineSeparated__title}>HOẶC</span>
            <div className={styles.lineSeparated__part}></div>
          </div>
          <div className={`${styles.socialLogin} `}>
            <div
              className={`${styles.buttonFacebookLoginContainer} d-flex justify-content-between`}
            >
              <div
                className={`${styles.iconContainer} d-flex align-items-center justify-content-center`}
              >
                <FontAwesomeIcon
                  icon={["fab", "facebook-f"]}
                  style={{ fontSize: "140%", color: "#4c66a4" }}
                />
              </div>
              <button
                className={styles.buttonFacebookLogin}
                onClick={this.loginByFacebook}
              >
                Đăng nhập bằng Facebook
              </button>
            </div>
            <div id="buttonDiv" className={styles.buttonGoogleLogin}></div>
          </div>
          <p>
            Bạn chưa có tài khoản?{" "}
            <span>
              <Link href="/dang-ky" passHref>
                <a onClick={this.handleToggle}>Đăng Ký</a>
              </Link>
            </span>
          </p>
        </section>
      </main>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(UnseenRoute(withRouter(LogIn)));
