import React from "react";
import loadingIcon from "../../assets/homepage-assets/Rolling-0.9s-200px.gif";
import styles from "./LoadingModal.module.scss";

const LoadingModal = ({isOpening}) => {
  return (
    <div
      className={
        isOpening
          ? `${styles.previewModal} ${styles.activeMode}`
          : `${styles.previewModal}`
      }
    >
      <Image src={loadingIcon} alt="loading icon" width={150} height={150} />
    </div>
  );
};

export default LoadingModal;
