import React, { Component } from "react";
import CarouselFade from "./CarouselFade";
import AlbumHomePage from "./AlbumHomePage";
import AlbumOfTheWeek from "./AlbumOfTheWeek";
import FamousArtist from "./FamousArtist";
import Subscription from "./Subscription";
import styles from "./HomePage.module.scss";
import Head from "next/head";

class HomePage extends Component {
  state = {
    isOpeningModal: false,
    previewId: null,
    inPreView: false,
  };

  render() {
    const { vietnameseAlbum, internationalAlbum, albumOfTheWeek } = this.props;
    // console.log(this.props.windowWidth)
    return (
      <main className={styles.mainContainer}>
        <Head>
          <title>QTV Music - Let's Rock On</title>
          <meta property="og:image" content="https://res.cloudinary.com/dqfemw7l4/image/upload/v1635868689/stuff/banner_klgtjp.jpg" />
          <meta property="og:description" content="Đĩa Nhạc Chất Lượng Quốc Tế" />
          
        </Head>
        <CarouselFade />
        <AlbumHomePage
          title={"Rock/Metal Việt Nam"}
          album={vietnameseAlbum}
          onOpen={this.handleOpening}
          windowWidth={this.props.windowWidth}
        />
        <AlbumHomePage
          title={"Rock/Metal Quốc Tế"}
          album={internationalAlbum}
          onOpen={this.handleOpening}
          windowWidth={this.props.windowWidth}
        />
        <AlbumOfTheWeek {...albumOfTheWeek[0]} />
        <FamousArtist windowWidth={this.props.windowWidth} />
        <Subscription />
      </main>
    );
  }
}

export default HomePage;
