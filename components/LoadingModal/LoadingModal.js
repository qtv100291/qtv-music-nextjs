import React from "react";
import loadingIcon from "../../assets/homepage-assets/Rolling-0.9s-200px.gif";
import styles from "./LoadingModal.module.scss";
import Image from "next/image";

const LoadingModal = ({ isOpening }) => {
  return (
    <div
      className={
        isOpening
          ? `${styles.previewModal} ${styles.activeMode}`
          : `${styles.previewModal}`
      }
    >
      <Image
        loading="eager"
        src={loadingIcon}
        alt="loading icon"
        width={60}
        height={60}
      />
    </div>
  );
};

export default LoadingModal;
