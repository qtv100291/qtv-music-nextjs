import loadingIcon from "../../assets/homepage-assets/loading-icon.gif";
import styles from "./LoadingScreen.module.scss";
import Image from "next/image";

const LoadingScreen = ({ isLoadingScreen }) => {
  return (
    <div
      className={
        isLoadingScreen
          ? `${styles.loadingScreen}`
          : `${styles.loadingScreen} ${styles.turnOff}`
      }
    >
      <Image loading="eager" src={loadingIcon} alt="loading icon" />
    </div>
  );
};

export default LoadingScreen;
