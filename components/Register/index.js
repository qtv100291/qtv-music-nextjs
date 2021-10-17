import React from "react";
import Form from "../Common/Form";
import styles from "./Register.module.scss";
import Link from "next/link";
import registerNewUser from "../../services/registerService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import Head from "next/head";
import { withRouter } from "next/router";
import Spinner from "react-bootstrap/Spinner";
import UnseenRoute from "../UnseenRoute";

class Register extends Form {
  state = {
    data: {},
    errors: {},
    serverError: "",
    disabled: true,
    isLoading: false,
  };

  inputCheck = {
    emailRegister: "emailCheck",
    // phoneRegister: "phoneCheck",
    passwordRegister: "passwordCheck",
    passwordRegisterRetype: "checkRetype",
  };

  doSubmit = async () => {
    console.log("run")
    const MySwal = withReactContent(Swal);
    this.setState({ isLoading: true, disabled: true });
    try {
      const { data: user } = this.state;
      await registerNewUser(user);
      MySwal.fire({
        icon: "success",
        html: "Đăng Ký Thành Công",
        showConfirmButton: false,
        timer: 1250,
      }).then(() => {
        additionalFunctionDom.releaseBody();
        this.props.router.replace("/dang-nhap");
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        const serverError = "Email này đã được sử dụng";
        this.setState({ serverError, disabled: false});
      }
    }
    this.setState({ isLoading: false });
  };

  handleToggle = (e) => {
    e.preventDefault();
    this.props.router.replace("/dang-nhap");
  };

  render() {
    return (
      <main className={styles.registerSection}>
        <Head>
          <title>Đăng Ký</title>
        </Head>
        <section className={styles.registerContainer}>
          <h2>ĐĂNG KÝ</h2>
          {this.state.serverError && (
            <div className={styles.validFeedback}>{this.state.serverError}</div>
          )}
          <form onSubmit={this.handleSubmit} className={styles.registerForm}>
            {this.renderInputType2("emailRegister", "Email Đăng Ký")}
            {this.renderInputType2("nameRegister", "Họ Tên")}
            {/* {this.renderInputType2(
              "phoneRegister",
              "Số Điện Thoại",
              "text",
              "true"
            )} */}
            {this.renderInputType2(
              "passwordRegister",
              "Mật Khẩu Chứa Ít Nhất 6 Kí Tự",
              "password"
            )}
            {this.renderInputType2(
              "passwordRegisterRetype",
              "Nhập Lại Mật Khẩu",
              "password"
            )}
            <p>
              Khi bạn Khi bạn nhấn ĐĂNG KÝ, bạn đã đồng ý với những{" "}
              <span>
                <Link href="/dieu-khoan-dich-vu">Điều Khoản</Link>
              </span>{"  "}
              của QTV Guitar Shop.
            </p>
            <button type="submit" disabled={this.state.disabled}>
              {this.state.isLoading && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}{" "}&nbsp;
              Đăng Ký
            </button>
          </form>
          <p>
            Bạn đã có tài khoản?{" "}
            <span>
              <Link href="/dang-nhap" passHref>
                <a>Đăng nhập</a>
              </Link>
            </span>
          </p>
        </section>
      </main>
    );
  }
}

export default UnseenRoute(withRouter(Register));
