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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import { connect } from "react-redux";
import { openLoadingModal, closeLoadingModal } from "../../store/loadingModal";
import GoogleButtonSignUp from "./GoogleButtonSignUp";
// import { axiosInner } from "../../services/httpService";

const mapDispatchToProps = (dispatch) => ({
  openLoadingModalPage() {
    additionalFunctionDom.fixBody();
    dispatch(openLoadingModal());
    console.log("outside dispatch");
  },
  closeLoadingModalPage() {
    additionalFunctionDom.releaseBody();
    dispatch(closeLoadingModal());
    console.log("inside dispatch");
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

  
  doSubmit = async () => {
    const MySwal = withReactContent(Swal);
    this.setState({ isLoading: true, disabled: true });
    // const response = await axiosInner.get("https://acm.haiphatland.com.vn/api/abphpl/ThongKeTheoThangUser")
    // console.log(response)
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
      if (ex.response && ex.response.status === 409) {
        const serverError = ex.response.data.message;
        this.setState({ serverError });
      }
      this.setState({ disabled: false, isLoading: false });
    }
    this.setState({ disabled: false, isLoading: false });
  };

  loginByFacebook = async () => {
    this.props.openLoadingModalPage();
    const MySwal = withReactContent(Swal);
    const closeLoadingModalPage = this.props.closeLoadingModalPage.bind(this)
    // console.log("outside",this)
    // console.log(FB)
    FB.login(
      async function (response) {
        const { authResponse } = response;
        console.log(authResponse);
        const data = {
          accessToken: authResponse.accessToken,
          userID: authResponse.userID,
        };
        console.log("inside",this)
        try {
          await loginFacebook(data);
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
        closeLoadingModalPage ()
      },
      { scope: "email " }
    );
  };

  handleToggle = (e) => {
    e.preventDefault();
    this.props.router.replace("/dang-ky");
  };

  render() {
    console.log(this.props.windowWidth)
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
            <GoogleButtonSignUp windowWidth = {this.props.windowWidth}/>
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
