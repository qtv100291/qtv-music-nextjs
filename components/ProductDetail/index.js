import React, { Component } from "react";
import BreadCrumb from "../Common/BreadCrumb";
import AudioPlayer from "../Common/audioPlayer";
import AlbumHomePage from "../HomePage/AlbumHomePage";
import addfunc from "../../utils/additionalFunction";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import shoppingCartFunc from "../../utils/shoppingCartFunc";
import { cartAddItem } from "../../store/shoppingCart";
import styles from "./ProductDetail.module.scss";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Head from "next/head";
import Image from "next/image";

const mapStateToProps = (state) => ({
  shoppingCart: state.shoppingCart,
  isLogged: state.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  cartAddItem: (item) => {
    dispatch(cartAddItem(item));
  },
});

class AlbumDetail extends Component {
  state = {
    album: {},
    currentTab: "1",
    relatedAlbum: [],
    windowWidth: null,
  };

  componentDidMount(){
    const windowWidth = window.innerWidth;
    window.addEventListener("resize", this.updateWindowWidth);
    this.setState({
      windowWidth,
    });
  }

  handleActiveTab = ({ currentTarget: tab }) => {
    const currentTab = tab.getAttribute("data-button");
    this.setState({ currentTab });
  };

  handleAddToCart = () => {
    const { id, albumName, price, albumCover, bandName } =
      this.props.productContent;
    const imagePath = albumCover;
    const MySwal = withReactContent(Swal);
    const newItem = new shoppingCartFunc.Item(
      id,
      albumName,
      price,
      imagePath,
      bandName
    );
    this.props.cartAddItem(newItem);
    shoppingCartFunc.saveShoppingCart();
    additionalFunctionDom.fixBody();
    MySwal.fire({
      icon: "success",
      html: "Đã Thêm Vào Giỏ Hàng",
      showConfirmButton: false,
      timer: 1250,
    }).then(() => {
      additionalFunctionDom.releaseBody();
    });
  };

  updateWindowWidth = () => {
    const windowWidth = window.innerWidth;
    this.setState({ windowWidth });
  };

  render() {
    const {
      releaseYear,
      albumName,
      bandName,
      albumCover,
      price,
      description,
      previewSong,
      previewSongName,
      listSong,
      listSongDuration,
    } = this.props.productContent;

    const { relatedAlbum } = this.props;
    console.log(relatedAlbum);
    const imagePath = albumCover;
    const mp3Path = previewSong;

    return (
      <main className={styles.sectionAlbumDetail}>
        <Head>
          <title>{albumName}</title>
        </Head>
        <BreadCrumb
          titleParent="Sản Phẩm"
          title={albumName}
          backgroundImage={`url(/san-pham-detail-banner.jpg)`}
        />
        <section
          className={`${styles.sectionAlbumDetailContainer} d-flex justify-content-between`}
        >
          <div className={styles.albumCoverPhoto}>
            <div className={styles.albumCoverPhotoContainer}>
              <Image src={imagePath} alt={albumName} layout="fill" />
            </div>
          </div>
          <div className={styles.albumDetail}>
            <h3 className={styles.albumName}>{albumName}</h3>
            <h3 className={styles.albumBandName}>
              {bandName} - {releaseYear}
            </h3>
            <h3 className={styles.albumPrice}>{price} VND</h3>
            <AudioPlayer src={mp3Path} songName={previewSongName} />
            <div
              className={`${styles.buttonAddToCart} d-flex justify-content-center align-items-center`}
              onClick={this.handleAddToCart}
            >
              Thêm Vào Giỏ Hàng
            </div>
            <div className={styles.productPresentation}>
              <div className={`${styles.productPresentationHeader} d-flex`}>
                <div
                  className={
                    this.state.currentTab === "1"
                      ? `${styles.headerItem} d-flex justify-content-center align-items-center ${styles.activeTab}`
                      : `${styles.headerItem} d-flex justify-content-center align-items-center`
                  }
                  onClick={this.handleActiveTab}
                  data-button="1"
                >
                  Giới Thiệu
                </div>
                <div
                  className={
                    this.state.currentTab === "2"
                      ? `${styles.headerItem} d-flex justify-content-center align-items-center ${styles.activeTab}`
                      : `${styles.headerItem} d-flex justify-content-center align-items-center`
                  }
                  onClick={this.handleActiveTab}
                  data-button="2"
                >
                  Tracklist
                </div>
              </div>
              <div className={styles.productPresentationContent}>
                <div
                  className={
                    this.state.currentTab === "1"
                      ? `${styles.albumDescription} ${styles.tabContent} ${styles.activeTabContent}`
                      : `${styles.albumDescription} ${styles.tabContent}`
                  }
                >
                  {description && description.map((x, i) => <p key={i}>{x}</p>)}
                </div>
                <div
                  className={
                    this.state.currentTab === "2"
                      ? `${styles.albumTrackList} justify-content-between ${styles.tabContent} ${styles.activeTabContent}`
                      : `${styles.albumTrackList} justify-content-between ${styles.tabContent}`
                  }
                >
                  <div className={styles.albumTrackListSong}>
                    {listSong &&
                      listSong.map((x, i) => (
                        <div
                          key={i}
                          className={`song-item d-flex justify-content-between`}
                        >
                          <p>
                            {i + 1}. {x}
                          </p>{" "}
                          <p>{addfunc.songTimeDuration(listSongDuration[i])}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="related-album">
          <AlbumHomePage
            title={"Có Thể Bạn Cũng Thích"}
            album={relatedAlbum}
            onOpen={this.handleOpening}
            windowWidth={this.state.windowWidth}
          />
        </section>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail);
