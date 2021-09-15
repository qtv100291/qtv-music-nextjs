import React, { Component } from "react";
import CarouselFade from "./CarouselFade";
import AlbumHomePage from "./AlbumHomePage";
import AlbumOfTheWeek from "./AlbumOfTheWeek";
import FamousArtist from "./FamousArtist";
import Subscription from "./Subscription";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import styles from "./HomePage.module.scss";
import Head from "next/head";

class HomePage extends Component {
  state = {
    isOpeningModal: false,
    previewId: null,
    inPreView: false,
    windowWidth: null,
  };

  componentDidMount() {
    const windowWidth = window.innerWidth;
    window.addEventListener("resize", this.updateWindowWidth);
    this.setState({
      windowWidth,
    });
    setTimeout(() => {
      // this.props.onLoadingScreen();
      // additionalFunctionDom.releaseBody();
    }, 500);
  }

  updateWindowWidth = () => {
    const windowWidth = window.innerWidth;
    this.setState({ windowWidth });
  };

  render() {
    const { vietnameseAlbum, internationalAlbum, albumOfTheWeek } = this.props;
    return (
      <main className={styles.mainContainer}>
        <Head>
          <title>QTV Music</title>
        </Head>
        <CarouselFade />
        <AlbumHomePage
          title={"Rock/Metal Việt Nam"}
          album={vietnameseAlbum}
          onOpen={this.handleOpening}
          windowWidth={this.state.windowWidth}
        />
        <AlbumHomePage
          title={"Rock/Metal Quốc Tế"}
          album={internationalAlbum}
          onOpen={this.handleOpening}
          windowWidth={this.state.windowWidth}
        />
        <AlbumOfTheWeek {...albumOfTheWeek[0]} />
        <FamousArtist windowWidth={this.state.windowWidth} />
        <Subscription />
      </main>
    );
  }
}

export default HomePage;
