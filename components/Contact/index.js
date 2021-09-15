import React, { useEffect } from "react";
import BreadCrumb from "../Common/BreadCrumb";
import styles from "./ContactUs.module.scss";
import Head from "next/head";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import Link from "next/link";

const ContactUs = ({ onLoadingScreen }) => {
  useEffect(() => {
    // onLoadingScreen();
    // additionalFunctionDom.fixBody();
    // setTimeout( () => {
    //     onLoadingScreen();
    //     additionalFunctionDom.releaseBody();
    // },1200)
  }, []);

  return (
    <main className={styles.contactUs}>
      <Head>
        <title>Liên Hệ</title>
      </Head>
      <BreadCrumb
        titleParent="Liên Hệ"
        backgroundImage={`url(/contact-banner.jpg)`}
      />
      <section className={styles.aboutUs}>
        <h2 className={`${styles.aboutUsTitle} title-section`}>
          Câu Chuyện Về Chúng Tôi
        </h2>
        <p>
          Đầu những năm 90 của thế kỉ trước, khi mà Rock và Metal bắt đầu được
          phổ biến rộng rãi hơn tại Việt Nam, đặc biệt là trong giới sinh viên.
          Khi ấy niềm vui được sỡ hữu một băng catset hay một đĩa CD chính gốc
          thật khó có gì diễn tả nổi. Trong đó có một nhóm sinh viên đến từ các
          trường Xây Dựng, Bách Khoa,... đã cùng đứng ra mở một cửa hiệu kinh
          doanh băng đĩa nhạc chính hãng, với mong muốn lan tỏa và chia sẻ niềm
          đam mê được sở hữu những album chất lượng đến với các fan hâm mộ của
          thể loại Rock/Metal tại Việt Nam, đó cũng chính là tiền thân của QTV
          Music hiện nay.
        </p>
        <p>
          Không chỉ là nơi mua bán, QTV Music còn là nơi những người hâm mộ của
          Rock/Metal tìm đến để cùng chia sẻ cho nhau những đam mê về các ban
          nhạc hay các ca khúc thịnh hành thời bấy giờ.
        </p>
        <p>
          Trải qua gần 20 năm thành lập, đến nay QTV Music là nhà phân phối băng
          đĩa nhạc online hàng đầu tại Việt Nam, các sản phẩm được giới thiệu
          trên QTV Music đều được cam kết đảm bảo 100% là hàng chính hãng được
          các hãng đĩa phát hành.
        </p>
      </section>
      <section className={styles.shopInformation}>
        <h2 className={`${styles.shopInformationTitle} title-section`}>
          {" "}
          Thông Tin Liên Hệ
        </h2>
        <div
          className={`${styles.shopInformationContainer} d-flex justify-content-between`}
        >
          <div className={styles.shopGoogleMap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.352280371583!2d105.7827840507617!3d20.978511294798526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acd2875155ef%3A0xb4e3002e25c0426b!2zSOG7kyBHxrDGoW0gUGxhemEgSMOgIMSQw7RuZw!5e0!3m2!1sen!2s!4v1596277513831!5m2!1sen!2s"
              title="google-map"
            ></iframe>
          </div>
          <div className={styles.shopInformationDetail}>
            <h3>QTV Music Entertainment</h3>
            <p>
              Trụ sở công ty: Tầng 10, tòa nhà Hồ Gươm Plaza, Hà Đông, Hà Nội
            </p>
            <p>
              Số điện thoại: <a href="tel:19001570">19001570</a>{" "}
            </p>
            <p>Email: qtv-music@gmail.com</p>
            <p>Website: qtv-music.web.app/</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
