const nodemailer = require("nodemailer");
import fs from "fs";
import path from "path";
import addFunc from "./additionalFunction";
// const readline = require('readline');
// const {google} = require('googleapis');

export default async function sendEmailConfirmation(clientEmail, order) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    tls: { rejectUnauthorized: false },
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });


  const filePathProvince = path.join(process.cwd(), "data", "province.json");
  const fileDataProvince = fs.readFileSync(filePathProvince);
  const dataProvince = JSON.parse(fileDataProvince);
  const filePathDistrict = path.join(process.cwd(), "data", "district.json");
  const fileDataDistrict = fs.readFileSync(filePathDistrict);
  const dataDistrict = JSON.parse(fileDataDistrict);
  const filePathCommune = path.join(process.cwd(), "data", "commune.json");
  const fileDataCommune = fs.readFileSync(filePathCommune);
  const dataCommune = JSON.parse(fileDataCommune);
  const province = dataProvince.province.find(
    (province) => province.idProvince === order.address.province
  );

  // console.log(province);

  const district = dataDistrict.district.find(
    (district) => district.idDistrict === order.address.district
  );

  // console.log(district);

  const commune = dataCommune.commune.find(
    (commune) => commune.idCommune === order.address.commune
  );

  // console.log(commune);

  const orderId = (Math.random() * (999999999 - 100000000) + 100000000).toFixed(
    0
  );

  const totalMoneyCalculation = addFunc.totalMoneyCalculation(order.orderList);

  const mailContent = `  <div
  class="container"
  style="
    background-color: rgb(156, 156, 156);
    overflow: auto;
    width: 100%;
    font-family: 'Roboto', sans-serif;
  "
>
  <div
    class="body"
    style="
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: white;
    "
  >
    <div
      class="logo-container"
      style="
        width: 100%;
        height: 55px;
        background-color: #282834;
        text-align: center;
      "
    >
      <h1
        class="logo"
        style="
          text-decoration: none;
          margin: 0;
          font-style: normal;
          font-weight: 800;
          font-size: 36px;
          line-height: 55px;
          font-family: 'Catamaran', sans-serif;
          color: white;
        "
      >
        QTV Music
      </h1>
    </div>
    <main>
      <h2
        style="
          color: #dc2751;
          font-size: 20px;
          display: block;
          width: 95%;
          margin: 20px auto;
        "
      >
        Cảm ơn quý khách đã đặt hàng tại QTV Music
      </h2>
      <p style="width: 95%; margin: 0 auto; font-size: 14px">
        QTV Music rất vui thông báo đơn hàng #${orderId} của quý khách đã được
        tiếp nhận và đang trong quá trình xử lý. QTV Music sẽ thông báo đến
        quý khách ngay khi hàng chuẩn bị được giao.
      </p>
      <div class="customer-info" style="width: 95%; margin: 0 auto">
        <h3 style="font-style: italic; font-size: 18px; margin: 15px 0">
          Thông tin khách hàng
        </h3>
        <p style="margin: 5px 0; font-size: 14px">Người nhận : ${
          order.receiverName
        }</p>
        <p style="margin: 5px 0; font-size: 14px">Điện thoại : ${
          order.phone
        }</p>
        <p style="margin: 5px 0; font-size: 14px">Điạ chỉ liên hệ : ${
          order.address.street
        }, ${commune.name}, ${district.name}, ${province.name}</p>
      </div>
      <h3
        style="
          font-style: italic;
          font-size: 18px;
          display: block;
          width: 95%;
          margin: 15px auto;
        "
      >
        Chi tiết đơn hàng
      </h3>
      <table
        style="
          font-size: 13px;
          width: 95%;
          margin: 0 auto;
          border-collapse: collapse;
        "
      >
        <thead style="background-color: #dc2751; color: white">
          <tr class="data-head">
            <th style="text-align: left">Sản phẩm</th>
            <th>Giá tiền</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          ${renderOrderList(order.orderList)}
        </tbody>
        <tfoot>
          <tr
            class="data-total-pre data-total"
            style="border-top: 1px solid black"
          >
            <td colspan="3" style="text-align: center">
              <b style="margin: 0.5rem 0; display: block; font-size: 14px"
                >Tạm tính :
              </b>
            </td>
            <td style="text-align: center"><b>${addFunc
              .separator1000((totalMoneyCalculation)
              .toFixed(0))} VND </b></td>
          </tr>
          <tr class="data-vat data-total">
            <td colspan="3" style="text-align: center">
              <b style="margin: 0.5rem 0; display: block; font-size: 14px"
                >Thuế VAT :
              </b>
            </td>
            <td style="text-align: center"><b>${addFunc
              .separator1000((totalMoneyCalculation * 0.1)
              .toFixed(0))} VND </b></td>
          </tr>
          <tr class="data-total-finish data-total">
            <td colspan="3" style="text-align: center">
              <b style="margin: 0.5rem 0; display: block; font-size: 14px"
                >Tổng giá trị đơn hàng :
              </b>
            </td>
            <td style="text-align: center"><b>${addFunc
              .separator1000((totalMoneyCalculation * 1.1)
              .toFixed(0))} VND </b></td>
          </tr>
        </tfoot>
      </table>
    </main>
    <footer
      style="
        width: 95%;
        margin: 20px auto;
        font-size: 12px;
        color: rgb(78, 78, 78);
        padding-bottom: 30px;
      "
    >
      <p style="margin: 5px 0; font-style: italic">
        Quý khách nhận được email này vì đã mua hàng tại QTV Music. Nếu có
        thắc mắc hoặc cần tư vấn, xin hãy phản hồi vào địa chỉ mail:
        qtv.music.shop@gmail.com hoặc gọi điện đến số 19001570
      </p>
    </footer>
  </div>
</div>`;

  const mailDetails = {
    from: process.env.NEXT_PUBLIC_EMAIL,
    to: clientEmail,
    subject: "Xác nhận đơn hàng",
    html: mailContent,
  };

  transporter.sendMail(mailDetails, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  console.log("welcome email was sent")
}

function renderOrderList(orderList) {
  let orderHtml = "";
  for (let i = 0; i < orderList.length; i++) {
    orderHtml += 
    `<tr class="data-row" style="margin-top: 5px">
      <td style="font-size: 13px">
        <p>${orderList[i].name}</p>
      </td>
      <td style="text-align: center; font-size: 13px">
        <p>${orderList[i].price} VND</p>
      </td>
      <td style="text-align: center; font-size: 13px"><p>${
        orderList[i].count
      }</p></td>
      <td style="text-align: center; font-size: 13px">
        <p>${addFunc.separator1000(
          orderList[i].price * orderList[i].count
        )}.000 VND</p>
      </td>
    </tr>`;
  }
  return orderHtml;
}
