import React, { Component } from "react";
import { getAlbumDetail } from "../../services/albumServiceHomePage";
// import AudioPlayer from '../common/audioPlayer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import shoppingCartFunc from "../../utils/shoppingCartFunc";
import styles from "./PreviewModal.module.scss";
import { createRef } from "react";
import loadingIconSmall from "../../assets/homepage-assets/loading-icon-small.gif";
import { connect } from "react-redux";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import { closeQuickViewModal } from "../../store/quickViewModal";
import { cartAddItem } from "../../store/shoppingCart";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Image from "next/image";

const mapStateToProps = (state) => ({
  isOpeningModal: state.quickViewModal.isOpening,
  quickViewId: state.quickViewModal.quickViewId,
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    additionalFunctionDom.releaseBody();
    dispatch(closeQuickViewModal());
  },
  cartAddItem: (item) => {
    dispatch(cartAddItem(item));
  },
});

class PreviewModal extends Component {
  state = {
    album: {},
    isLoading: false,
  };

  myModal = createRef();

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { data: album } = await getAlbumDetail(this.props.quickViewId);
    console.log("data", album);
    this.setState({ album });
    this.setState({ isLoading: false });
  }

  handleCloseModal = (event) => {
    if (event.target.classList.contains(`${styles.previewModal}`))
      this.props.closeModal();
  };

  handleAddToCart = async () => {
    const { id, albumName, price, albumCover, bandName } = this.state.album;
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
    this.props.closeModal();
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

  render() {
    const { id, albumName, bandName, albumCover, price, description } =
      this.state.album;
    const { isLoading } = this.state;
    const imagePath = albumCover;
    const productPath =
      "/san-pham/" + (albumName && albumName.replace(/ /g, "-")) + "-" + id;
    return (
      <div
        className={
          this.props.isOpeningModal
            ? `${styles.previewModal} ${styles.activeMode}`
            : `${styles.previewModal}`
        }
        onClick={this.handleCloseModal}
      >
        <div
          className={`${styles.previewModalContainer} d-flex justify-content-between align-items-center`}
        >
          <div
            className={
              isLoading
                ? `${styles.loadingScreenModal}`
                : `${styles.loadingScreenModal} ${styles.turnOff}`
            }
          >
            <Image
              loading="eager"
              src={loadingIconSmall}
              alt="loading icon"
              width={80}
              height={80}
            />
          </div>
          <div
            className={`${styles.closeButton} d-flex justify-content-center align-items-center`}
            onClick={this.props.closeModal}
          >
            <FontAwesomeIcon icon="times-circle" />
          </div>
          <div className={styles.previewModalPhoto}>
            {imagePath && (
              <Image
                loading="eager"
                src={imagePath}
                alt={albumName}
                layout="fill"
              />
            )}
          </div>
          <div className={styles.previewModalContent} ref={this.myModal}>
            <Link href={productPath} passHref >
              <a onClick={this.props.closeModal}>
                <h3 className={styles.albumName}>{albumName}</h3>
              </a>
            </Link>
            <h3 className={styles.albumBandName}>{bandName}</h3>
            <h3 className={styles.albumPrice}>{price} VND</h3>
            {/* <AudioPlayer src ={mp3Path} songName = {previewSongName} inPreView={this.props.inPreView}/> */}
            <div
              className={`${styles.buttonAddToCart} d-flex justify-content-center align-items-center`}
              onClick={this.handleAddToCart}
            >
              Thêm Vào Giỏ Hàng
            </div>
            <div className={styles.previewModalPresentation}>
              <h4 className={styles.previewModalPresentationTitle}>
                Giới Thiệu :{" "}
              </h4>
              <div className={styles.albumDescription}>
                {description && description.map((x, i) => <p key={i}>{x}</p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewModal);
