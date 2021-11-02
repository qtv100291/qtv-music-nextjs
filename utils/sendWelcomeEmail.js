import nodemailer from "nodemailer";
import { SMTPClient } from 'emailjs';

export default async function sendWelcomeEmail(clientEmail) {

  // const client = new SMTPClient({
  //   user: process.env.NEXT_PUBLIC_EMAIL,
  //   password: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  //   host: 'smtp.gmail.com',
  //   ssl: true,
  // });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    tls: { rejectUnauthorized: false },
    auth: {
      type: "OAuth2",
      user: process.env.NEXT_PUBLIC_EMAIL,
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
      accessToken: process.env.NEXT_GOOGLE_GMAIL_ACCESS_TOKEN,
      refreshToken: process.env.NEXT_GOOGLE_GMAIL_REFRESH_TOKEN,
    },
  });

  const mailContent = `<div
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
      <div style="width: 100%; text-align: center; ">
        <img
          src="https://res.cloudinary.com/dqfemw7l4/image/upload/v1635776919/stuff/unnamed_1_rzmdrk.jpg"
          style=" width: 100%"
        />
      </div>
      <h2
        style="
          color: #dc2751;
          font-size: 22px;
          display: block;
          width: 95%;
          margin: 20px auto;
          text-align: center;
        "
      >
        WELCOME TO QTV MUSIC SHOP
      </h2>
      <p
        style="
          width: 95%;
          margin: 0 auto 10px auto;
          font-size: 16px;
          line-height: 20px;
          font-weight: 600;
        "
      >
        Cảm ơn vì đã đăng kí và trở thành người đồng hành cùng QTV Music Shop.
        Hi vọng bạn sẽ tìm được thật nhiều niềm vui tại đây.
      </p>
      <p
        style="
          width: 95%;
          margin: 0 auto 10px auto;
          font-size: 16px;
          line-height: 20px;
          font-weight: 600;
        "
      >
        Đừng quên truy cập
        <a href="www.qtv-music-shop.com" target="_blank"
          >www.qtv-music-shop.com</a
        >
        mỗi ngày để cập nhập những album và thông tin âm nhạc mới nhất cùng
        chúng tôi.
      </p>
      <p
        style="
          width: 95%;
          margin: 0 auto 10px auto;
          font-size: 16px;
          line-height: 20px;
          font-weight: 600;
        "
      >
      Nếu có yêu cầu hoặc cần trợ giúp, hãy liên hệ với chúng tôi qua thông tin phía dưới email này.
    </p>
    </main>
    <footer
      style="
        width: 95%;
        margin: 20px auto;
        font-size: 12px;
        color: rgb(78, 78, 78);
        padding-bottom: 20px;
        border-top: solid 1px rgb(136, 136, 136);
      "
    >
      <p style="margin: 5px 0; font-style: italic; line-height: 18px">
        QTV Music Shop
      </p>
      <p style="margin: 5px 0; font-style: italic">
        Địa chỉ: Hồ Gươm Plaza, Trần Phú, Hà Đông, Hà Nội.
      </p>
      <p style="margin: 5px 0; font-style: italic">
        Email: qtv.music.shop@gmail.com
      </p>
      <p style="margin: 5px 0; font-style: italic">Điện thoại: 19001570</p>
    </footer>
  </div>
</div>`;

  const mailDetails = {
    from: process.env.NEXT_PUBLIC_EMAIL,
    to: clientEmail,
    subject: "Đăng Ký Thành Công",
    html: mailContent,
  };

  // await new Promise((resolve, reject) => {
  //   // send mail
  //   transporter.sendMail(mailDetails, (err, info) => {
  //     if (err) {
  //       console.error(err);
  //       reject(err);
  //     } else {
  //       console.log(info);
  //       resolve(info);
  //     }
  //   });
  // });

  transporter.sendMail(mailDetails, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  // client.send({

	// 	from: process.env.NEXT_PUBLIC_EMAIL,
	// 	to: clientEmail,
	// 	subject: "Đăng Ký Thành Công",
  //   attachments: [{data: mailContent, alternative: true}]
	// },
	// (err, message) => {
	// 	console.log(err || message);
	// })
  console.log("welcome email was sent")
}


