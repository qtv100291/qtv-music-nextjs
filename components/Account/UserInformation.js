import React from "react";
import Form from "../Common/Form";
import payoutService from "../../services/payoutService";
import styles from "./UserInformation.module.scss";
import { connect } from "react-redux";
import { updateUserInformation } from "../../store/authentication";
import { openLoadingModal, closeLoadingModal } from "../../store/loadingModal";
import updateUser from "../../services/updateService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import Head from "next/head";

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateUser: (userInfo) => {
    dispatch(updateUserInformation(userInfo));
  },
  onOpenLoadingModal: () => {
    additionalFunctionDom.fixBody();
    dispatch(openLoadingModal());
  },
  onCloseLoadingModal: () => {
    additionalFunctionDom.releaseBody();
    dispatch(closeLoadingModal());
  },
});

class UserInformation extends Form {
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

  userLoadProperty = [
    "userName",
    "userPhone",
    "userProvince",
    "userDistrict",
    "userCommune",
    "userStreet",
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

  state = {
    data: {},
    disabled: true,
    errors: {},
    serverError: {},
    province: [{ ...this.provinceInit }],
    district: [{ ...this.districtInit }],
    commune: [{ ...this.communeInit }],
  };

  async componentDidMount() {
    // console.log("state", this.state);
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
      console.log(userLoad.userProvince !== "")
      const provinceList = await payoutService.getProvince();
      const province = [{ ...this.provinceInit }, ...provinceList];
      if (userLoad.userProvince !== "") {
        await this.hanldeDistrict(userLoad.userProvince);
      }
      if (userLoad.userDistrict !== "") {
        await this.hanldeCommune(userLoad.userDistrict);
      }
      this.setState({ data: userLoad, province }, () => {
        console.log("state after", this.state);
      });
    }
  }

  async componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.userData).length === 0) {
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
        await this.hanldeDistrict(userLoad.userProvince);
      }
      if (userLoad.userDistrict !== "") {
        await this.hanldeCommune(userLoad.userDistrict);
      }
      this.setState({ data: userLoad, province });
    }
  }

  hanldeDistrict = async (idProvince) => {
    if (idProvince === "None") {
      this.setState({
        district: [{ ...this.districtInit }],
        commune: [{ ...this.communeInit }],
        data : {...this.state.data, userProvince: "", userDistrict: "", userCommune : ""}
      });
    } else {
      document.querySelector(`.${styles.userDistrict} > span`).style.display =
        "block";
      const districtList = await payoutService.getDistrict(idProvince);
      const district = [{ ...this.districtInit }, ...districtList];
      this.setState({ district, commune: [{ ...this.communeInit }], data : {...this.state.data, userProvince : idProvince, userDistrict: "", userCommune : ""} });
      document.querySelector(`.${styles.userDistrict}> span`).style.display =
        "none";
      // console.log(districtList)
    }
  };

  hanldeCommune = async (idDistrict) => {
    if (idDistrict === "None") {
      this.setState({ commune: [{ ...this.communeInit }], data: {...this.state.data,userDistrict: "", userCommune: ""} });
      
    } else {
      document.querySelector(`.${styles.userCommune} > span`).style.display =
        "block";
      const communeList = await payoutService.getCommune(idDistrict);
      const commune = [{ ...this.communeInit }, ...communeList];
      this.setState({ commune, data : {...this.state.data, userDistrict : idDistrict, userCommune: ""} });
      document.querySelector(`.${styles.userCommune} > span`).style.display =
        "none";
    }
  };

  doSubmit = async () => {
    this.props.onOpenLoadingModal();
    const userData = { ...this.props.userData };
    userData.address = {};
    userData.payment = {};
    const userLoadProperty = [...this.userLoadProperty];
    const userDataProperty = [...this.userDataProperty];
    const userDataUpdate = { ...this.state.data };
    for (let i = 0; i < userLoadProperty.length; i++) {
      if (userDataProperty[i].length === 1) {
        userData[userDataProperty[i][0]] = userDataUpdate[userLoadProperty[i]];
      } else {
        userData[userDataProperty[i][0]][userDataProperty[i][1]] =
          userDataUpdate[userLoadProperty[i]];
      }
    }
    userData.tradeHistory = [...this.props.userData.tradeHistory];
    this.setState({ userData });
    this.props.onUpdateUser(userData);
    await updateUser();
    this.props.onCloseLoadingModal();
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: "success",
      html: "Đã Cập Nhật Thông Tin",
      showConfirmButton: false,
      timer: 1250,
    }).then(() => {
      additionalFunctionDom.releaseBody();
    });
  };

  render() {
    const { province, district, commune } = this.state;
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
      <div className={styles.userInformation}>
        <Head>
          <title>Thông Tin Tài Khoản</title>
        </Head>

        <form className={styles.formAccount} onSubmit={this.handleSubmit}>
          <h2>THÔNG TIN TÀI KHOẢN</h2>
          <div className={styles.personalInformation}>
            <h3>Thông Tin Cá Nhân</h3>
            {this.renderInputType3(
              "userName",
              "Họ Tên",
              "Nhập họ tên người nhận",
              "false",
              10,
              "false"
            )}
            {this.renderInputType3(
              "userPhone",
              "Điện thoại",
              "Số điện thoại gồm 10 chữ số",
              "true",
              10,
              "false"
            )}
            {this.renderSelect(
              "userProvince",
              "Tỉnh/Thành Phố",
              province,
              "idProvince",
              "false"
            )}
            {this.renderSelect(
              "userDistrict",
              "Quận/Huyện",
              district,
              "idDistrict",
              "false",
              `${styles.userDistrict}`
            )}
            {this.renderSelect(
              "userCommune",
              "Phường/Xã",
              commune,
              "idCommune",
              "false",
              `${styles.userCommune}`
            )}
            {this.renderInputType3(
              "userStreet",
              "Địa Chỉ",
              "Nhập số nhà, tên đường",
              "false",
              10,
              "false"
            )}
          </div>
          <div className={styles.personalPaymentMethod}>
            <h3>Thông Tin Thanh Toán</h3>
            {this.renderSelect(
              "cardType",
              "Loại thẻ",
              cardType,
              "cardType",
              "false"
            )}
            {this.renderInputType3(
              "cardNumber",
              "Số Thẻ",
              "Số thẻ gồm 12 chữ số...",
              "true",
              12,
              "false"
            )}
            {this.renderInputType3(
              "cardOwner",
              "Tên Chủ Thẻ",
              "Lưu ý nhập khớp với tên trên thẻ",
              "false",
              10,
              "false"
            )}
            {this.renderInputType3(
              "cardExpireDate",
              "Ngày Hết Hạn",
              "MM/YYYY",
              "false",
              10,
              "false"
            )}
            {this.renderInputType3(
              "cardCvv",
              "Mã CVV/CVC",
              "Gồm 3 chữ số in ở mặt sau của thẻ...",
              "true",
              3,
              "false"
            )}
          </div>
          <button className={styles.buttonUpdate}>Cập Nhật Thông Tin</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInformation);
