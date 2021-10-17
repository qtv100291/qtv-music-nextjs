import React, { Component } from "react";
import scrollTopIcon from "../../assets/homepage-assets/up-arrow.svg";
import styles from "./ScrollTopIcon.module.scss";
import Image from "next/image";

class ScrollTopIcon extends Component {
  state = {
    isDisplaying: false,
  };

  componentDidMount() {
    window.onscroll = () => {
      if (
        document.body.scrollTop > 0 ||
        document.documentElement.scrollTop > 0
      ) {
        this.setState({ isDisplaying: true });
      } else {
        this.setState({ isDisplaying: false });
        setTimeout(
          () => document.documentElement.classList.remove("on-top"),
          200
        );
      }
    };
  }

  handleScrollToTop = () => {
    document.documentElement.classList.add("on-top");
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  render() {
    return (
      <div
        className={
          this.state.isDisplaying
            ? `${styles.scrollTopIcon}`
            : `${styles.scrollTopIcon} ${styles.onTop}`
        }
        onClick={this.handleScrollToTop}
      >
        <div
          className={`${styles.scrollTopIconContainer} d-flex justify-content-center align-items-center`}
        >
          <Image src={scrollTopIcon} alt="icon" />
        </div>
      </div>
    );
  }
}

export default ScrollTopIcon;
