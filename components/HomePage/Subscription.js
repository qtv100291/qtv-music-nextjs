import React from "react";
import Form from "../Common/Form";
import styles from "./Subscription.module.scss";
import subscrible from "../../services/subscriptionService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import additionalFunctionDom from "../../utils/additionalFunctionDom";

class Subscription extends Form {
  state = {
    data: {},
    errors: {},
  };

  handleSubmit = async (data, e) => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    try {
      await subscrible(data);
      additionalFunctionDom.fixBody();
      MySwal.fire({
        icon: "success",
        html: "Đăng Ký Thành Công",
        showConfirmButton: false,
        timer: 1250,
      }).then(() => {
        this.setState({ data: {} });
        additionalFunctionDom.releaseBody();
      });
    } catch (err) {
      console.log(err)
      if (err.response && err.response.status === 401) {
        additionalFunctionDom.fixBody();
        MySwal.fire({
          icon: "error",
          html: "Email Này Đã Được Sử Dụng",
          showConfirmButton: false,
          timer: 1250,
        }).then(() => {
          additionalFunctionDom.releaseBody();
        });
      }
    }
  };

  render() {
    const { data } = this.state;
    return (
      <section className={styles.subscriptionPart}>
        <h3>Đăng Ký Nhận Bản Tin</h3>
        <h5>Để cập nhật những thông tin mới nhất từ QTV Music</h5>
        <form
          onSubmit={(e) => this.handleSubmit(data, e)}
          className={`${styles.emailSubscriptionForm} d-flex`}
        >
          {this.renderInputType1("email-subscription", "Nhập Email Của Bạn...")}
          <input type="submit" value="Đăng Ký" />
        </form>
      </section>
    );
  }
}

export default Subscription;
