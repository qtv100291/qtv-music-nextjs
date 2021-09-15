import React, { Component } from "react";
import Link from "next/link";
import styles from "./AlbumItem.module.scss";
import { connect } from "react-redux";
import { openQuickViewModal } from "../../store/quickViewModal";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import Image from "next/image";

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleOpenModal: () => {
    additionalFunctionDom.fixBody();
    dispatch(openQuickViewModal({ id: ownProps.id }));
  },
});

class AlbumItem extends Component {
  render() {
    const { id, albumName, bandName, albumCover, price } = this.props;
    const imagePath = albumCover;
    const productPath =
      "/san-pham/" + (albumName && albumName.replace(/ /g, "-")) + "-" + id;
    return (
      <React.Fragment>
        <div className={styles.albumItem}>
          <div className={styles.albumPhoto}>
            <Link href={productPath} passHref>
              <Image src={imagePath} alt={albumName} layout="fill"/>
            </Link>
            <div
              className={`${styles.buttonQuickview} d-flex justify-content-center align-items-center`}
              onClick={this.props.handleOpenModal}
            >
              Xem Nhanh
            </div>
          </div>
          <h3 className={styles.albumName}>
            <Link href={productPath}>{albumName}</Link>
          </h3>
          <h3 className={styles.albumBandName}>{bandName}</h3>
          <h3 className={styles.albumPrice}>{price} VND</h3>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, mapDispatchToProps)(AlbumItem);
