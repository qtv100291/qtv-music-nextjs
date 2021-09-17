import React from "react";
import Form from "../Common/Form";
import styles from "./Payout.module.scss";
import addfunc from "../../utils/additionalFunction";
import payoutService from "../../services/payoutService";
import Link from "next/link";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  updateUserInformation,
  updateTradeHistory,
} from "../../store/authentication";
import {
  getTotalMoney,
  selectShoppingCart,
  removeAllItem,
} from "../../store/shoppingCart";
import { connect } from "react-redux";
import Head from "next/head";

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  getTotalMoney: getTotalMoney(state),
  shoppingCart: selectShoppingCart(state),
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateUser: (userInfo) => {
    dispatch(updateUserInformation(userInfo));
  },
  onTradeHistory: (tradeHistory) => {
    dispatch(removeAllItem());
    dispatch(updateTradeHistory(tradeHistory));
  },
});

class Payout extends Form {
  provinceInit = {
    idProvince: "None",
    name: "Chọn Tỉnh/Thành Phố ...",
  };

  districtInit = {
    idProvince: "None",
    idDistrict: "None",
    name: "Chọn Quận/Huyện...",
  };

  communeInit = {
    idDistrict: "None",
    idCommune: "None",
    name: "Chọn Phường/Xã...",
  };

  state = {
    data: {},
    errors: {},
    serverError: {},
    disabled: true,
    province: [{ ...this.provinceInit }],
    district: [{ ...this.districtInit }],
    commune: [{ ...this.communeInit }],
    isLoadingDistrict: false,
    isLoadingCommune: false,
  };

  inputCheck = {
    receiverName: "emptyCheck",
    receiverPhone: "phoneCheck",
    receiverProvince: "selectEmptyCheck",
    receiverDistrict: "selectEmptyCheck",
    receiverCommune: "selectEmptyCheck",
    receiverStreet: "emptyCheck",
  };

  inputCheckForCardPayment = {
    cardType: "selectEmptyCheck",
    cardNumber: "phoneCheck",
    cardOwner: "emptyCheck",
    cardExpireDate: "checkCardExpireDate",
    cardCvv: "phoneCheck",
  };

  userLoadProperty = [
    "receiverName",
    "receiverPhone",
    "receiverProvince",
    "receiverDistrict",
    "receiverCommune",
    "receiverStreet",
    "cardType",
    "cardNumber",
    "cardOwner",
    "cardExpireDate",
    "cardCvv",
  ];

  userDataProperty = [
    ["name"],
    ["phone"],
    ["address", "province"],
    ["address", "district"],
    ["address", "commune"],
    ["address", "street"],
    ["payment", "cardType"],
    ["payment", "cardNumber"],
    ["payment", "cardOwner"],
    ["payment", "cardExpireDate"],
    ["payment", "cardCvv"],
  ];

  async componentDidMount() {
    // this.props.onOpenLoadingScreen();
    // additionalFunctionDom.fixBody();
    const { userData } = this.props;
    if (Object.keys(userData).length !== 0) {
      const userLoadProperty = [...this.userLoadProperty];
      const userDataProperty = [...this.userDataProperty];
      const userLoad = {};
      for (let i = 0; i < userLoadProperty.length; i++) {
        if (userDataProperty[i].length === 1) {
          userLoad[userLoadProperty[i]] = userData[userDataProperty[i][0]];
        } else {
          userLoad[userLoadProperty[i]] =
            userData[userDataProperty[i][0]][userDataProperty[i][1]];
        }
      }
      const provinceList = await payoutService.getProvince();
      const province = [{ ...this.provinceInit }, ...provinceList];
      if (userLoad.userProvince !== "") {
        await this.hanldeDistrict(userLoad.receiverProvince);
      }
      if (userLoad.userDistrict !== "") {
        await this.hanldeCommune(userLoad.receiverDistrict);
      }
      this.setState({ data: userLoad, province });
      setTimeout(() => {
        // this.props.onCloseLoadingScreen();
        // additionalFunctionDom.releaseBody();
      }, 500);
    }
  }

  async componentDidUpdate(prevProps) {
    if (
      Object.keys(prevProps.userData).length === 0 &&
      Object.keys(this.props.userData).length !== 0
    ) {
      // this.props.onOpenLoadingScreen();
      additionalFunctionDom.fixBody();
      const { userData } = this.props;
      const userLoadProperty = [...this.userLoadProperty];
      const userDataProperty = [...this.userDataProperty];
      const userLoad = {};
      for (let i = 0; i < userLoadProperty.length; i++) {
        if (userDataProperty[i].length === 1) {
          userLoad[userLoadProperty[i]] = userData[userDataProperty[i][0]];
        } else {
          userLoad[userLoadProperty[i]] =
            userData[userDataProperty[i][0]][userDataProperty[i][1]];
        }
      }
      const provinceList = await payoutService.getProvince();
      const province = [{ ...this.provinceInit }, ...provinceList];
      if (userLoad.userProvince !== "") {
        await this.hanldeDistrict(userLoad.receiverProvince);
      }
      if (userLoad.userDistrict !== "") {
        await this.hanldeCommune(userLoad.receiverDistrict);
      }
      this.setState({ data: userLoad, province });
      setTimeout(() => {
        // this.props.onCloseLoadingScreen();
        additionalFunctionDom.releaseBody();
      }, 500);
    }
  }

  hanldeDistrict = async (idProvince) => {
    if (idProvince === "None") {
      this.setState({
        district: [{ ...this.districtInit }],
        commune: [{ ...this.communeInit }],
      });
    } else {
      document.querySelector(".receiverDistrict > span").style.display =
        "block";
      const districtList = await payoutService.getDistrict(idProvince);
      const district = [{ ...this.districtInit }, ...districtList];
      this.setState({ district, commune: [{ ...this.communeInit }] });
      document.querySelector(".receiverDistrict > span").style.display = "none";
    }
  };

  hanldeCommune = async (idDistrict) => {
    if (idDistrict === "None") {
      this.setState({ commune: [{ ...this.communeInit }] });
    } else {
      document.querySelector(".receiverCommune > span").style.display = "block";
      const communeList = await payoutService.getCommune(idDistrict);
      const commune = [{ ...this.communeInit }, ...communeList];
      this.setState({ commune });
      document.querySelector(".receiverCommune > span").style.display = "none";
    }
  };

  doSubmit = async () => {
    additionalFunctionDom.fixBody();
    const MySwal = withReactContent(Swal);
    const { data } = this.state;
    const { data : dataTradeHistory } = await payoutService.orderService(data);
    this.props.onTradeHistory(dataTradeHistory.tradeHistory);
    MySwal.fire({
      icon: "success",
      text: "Cảm ơn quý khách đã tin tưởng QTV Music, nhân viên của chúng tôi sẽ liên lạc với quý khách trong thời gian sớm nhất.",
      confirmButtonText: "Quay Về Trang Chủ",
    }).then(() => {
      window.location = "/";
    });
  };

  render() {
    const { province, district, commune } = this.state;
    const { shoppingCart } = this.props;
    const { paymentMethod } = this.state.data;
    const cardType = [
      {
        check: true,
        cardType: "None",
        name: "Chọn Loại Thẻ ...",
      },
      {
        cardType: "Visa",
        name: "Visa",
      },
      {
        cardType: "Master Card",
        name: "Master Card",
      },
      {
        cardType: "JCB",
        name: "JCB",
      },
    ];

    return (
      <main className={styles.payoutMain}>
        <Head>
          <title>Thanh Toán</title>
        </Head>
        <h2 className={styles.payoutTitle}>Thanh Toán</h2>
        <div
          className={`${styles.payoutContainer} d-flex justify-content-between`}
        >
          <section className={styles.payoutUserInfo}>
            <form onSubmit={this.handleSubmit} className={styles.payoutForm}>
              <div className={styles.payoutUserInfoDetail}>
                <h3>Thông Tin Người Nhận</h3>
                {this.renderInputType3(
                  "receiverName",
                  "Tên người nhận",
                  "Nhập họ tên người nhận"
                )}
                {this.renderInputType3(
                  "receiverPhone",
                  "Điện thoại",
                  "Số điện thoại gồm 10 chữ số",
                  "true"
                )}
                {this.renderSelect(
                  "receiverProvince",
                  "Tỉnh/Thành Phố",
                  province,
                  "idProvince"
                )}
                {this.renderSelect(
                  "receiverDistrict",
                  "Quận/Huyện",
                  district,
                  "idDistrict"
                )}
                {this.renderSelect(
                  "receiverCommune",
                  "Phường/Xã",
                  commune,
                  "idCommune"
                )}
                {this.renderInputType3(
                  "receiverStreet",
                  "Địa Chỉ",
                  "Nhập số nhà, tên đường"
                )}
                {this.renderTextArea(
                  "receiverNote",
                  "Ghi Chú",
                  "Bạn cần chúng tôi chú ý điều gì",
                  5
                )}
                <p className={styles.emptyWarning}>
                  <span className={styles.obligationMark}>*</span> Bạn không
                  được để trống mục này
                </p>
              </div>
              <div className={styles.paymentMethod}>
                <h3>Thông Tin Thanh Toán</h3>
                {this.renderRadioInput(
                  "paymentMethod",
                  "cash-method",
                  "Thanh toán bằng tiền mặt khi nhận hàng",
                  "cash",
                  "true"
                )}
                {this.renderRadioInput(
                  "paymentMethod",
                  "card-method",
                  "Thanh toán bằng thẻ thanh toán quốc tế",
                  "card"
                )}
                <div
                  className={
                    paymentMethod === "card"
                      ? `${styles.cardMethodContent} ${styles.displaying}`
                      : `${styles.cardMethodContent}`
                  }
                >
                  {this.renderSelect(
                    "cardType",
                    "Loại thẻ",
                    cardType,
                    "cardType"
                  )}
                  {this.renderInputType3(
                    "cardNumber",
                    "Số Thẻ",
                    "Số thẻ gồm 12 chữ số...",
                    "true",
                    12
                  )}
                  {this.renderInputType3(
                    "cardOwner",
                    "Tên Chủ Thẻ",
                    "Lưu ý nhập khớp với tên trên thẻ"
                  )}
                  {this.renderInputType3(
                    "cardExpireDate",
                    "Ngày Hết Hạn",
                    "MM/YYYY"
                  )}
                  {this.renderInputType3(
                    "cardCvv",
                    "Mã CVV/CVC",
                    "Gồm 3 chữ số in ở mặt sau của thẻ...",
                    "true",
                    3
                  )}
                  <p className={styles.emptyWarning}>
                    <span className={styles.obligationMark}>*</span> Bạn không
                    được để trống mục này
                  </p>
                </div>
              </div>
              <button
                className={styles.orderButton}
                disabled={
                  shoppingCart && shoppingCart.length === 0 ? true : false
                }
              >
                Đặt Hàng
              </button>
              <p className={styles.noteOrderButton}>
                (Kiểm tra kĩ thông tin trước khi nhấn nút)
              </p>
            </form>
          </section>
          <section className={styles.payoutShoppingCart}>
            <div className={styles.payoutShoppingContainer}>
              <div
                className={`${styles.payoutShoppingHeader} d-flex justify-content-between`}
              >
                <h3 className={styles.payoutShoppingTitle}>Đơn Hàng</h3>
                <Link href="/gio-hang" passHref>
                  <a>
                    <div className={styles.backToCartButton}>Sửa</div>
                  </a>
                </Link>
              </div>
            </div>
            <div className={styles.payoutShoppingBody}>
              {shoppingCart &&
                shoppingCart.map((item) => (
                  <div className={styles.itemList} key={item.id}>
                    <p>
                      {item.count} x {item.name}
                    </p>
                    <p>
                      ={" "}
                      {addfunc.separator1000(
                        item.count * item.price.replace(/\D/g, "")
                      )}{" "}
                      VND
                    </p>
                  </div>
                ))}
            </div>
            <div className={styles.payoutShoppingFooter}>
              <div
                className={`${styles.provisionalSum} d-flex justify-content-between`}
              >
                <span>Tạm tính:</span>{" "}
                {addfunc.separator1000(this.props.getTotalMoney)} VND
              </div>
              <div className="tax-vat d-flex justify-content-between">
                <span>Thuế VAT: </span>
                {addfunc.separator1000(this.props.getTotalMoney / 10)} VND
              </div>
              <div
                className={`${styles.totalMoney} d-flex justify-content-between`}
              >
                <strong>Tổng tiền:</strong>{" "}
                <span>
                  {" "}
                  {addfunc.separator1000(
                    (this.props.getTotalMoney * 1.1).toFixed(0)
                  )}{" "}
                  VND
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payout);
