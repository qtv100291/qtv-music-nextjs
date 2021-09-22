import React from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import bucTuong from "../../assets/band/buc-tuong-1.jpg";
import metallica from "../../assets/band/metallica.jpg";
import dragonForce from "../../assets/band/dragonforce-1.jpg";
import unlimited from "../../assets/band/unlimited.jpg";
import linkinPark from "../../assets/band/linkin-park.jpg";
import nightWish from "../../assets/band/night-wish-1.jpg";
import styles from "./SwiperSilderArtist.module.scss";
import Image from "next/image";
import Link from "next/link";

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const SwiperSliderArtist = ({ windowWidth }) => {
  const slidesPerView = (windowWidth) => {
    switch (true) {
      case windowWidth >= 992:
        return 3;
      case 576 <= windowWidth && windowWidth < 992:
        return 2;
      case windowWidth < 576:
        return 1;
      default:
        break;
    }
  };

  const spaceBetween = (windowWidth) => {
    switch (true) {
      case windowWidth >= 992:
        return 40;
      case 576 <= windowWidth && windowWidth < 992:
        return 25;
      case windowWidth < 576:
        return 20;
      default:
        break;
    }
  };

  const slideNumber = slidesPerView(windowWidth);
  const space = spaceBetween(windowWidth);

  return (
    <Swiper spaceBetween={space} slidesPerView={slideNumber} navigation>
      <SwiperSlide>
        <Link
          href={{
            pathname: "/san-pham",
            query: { filter: "Bức Tường" },
          }}
          passHref
        >
          <a>
            <div className={styles.sliderArtistItem }>
              <Image loading="eager" src={bucTuong} alt="Bức Tường" />
              <h4 className={`${styles.overlaySliderItem} d-flex align-items-center`}>
                Bức Tường
              </h4>
            </div>
          </a>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link
          href={{
            pathname: "/san-pham",
            query: { filter: "Metallica" },
          }}
          passHref
        >
          <a>
            <div className={styles.sliderArtistItem }>
              <Image loading="eager" src={metallica} alt="Metallica" />
              <h4 className={`${styles.overlaySliderItem} d-flex align-items-center`}>
                Metallica
              </h4>
            </div>
          </a>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link
          href={{
            pathname: "/san-pham",
            query: { filter: "Nightwish" },
          }}
          passHref
        >
          <a>
            <div className={styles.sliderArtistItem }>
              <Image loading="eager" src={nightWish} alt="Nightwish" />
              <h4 className={`${styles.overlaySliderItem} d-flex align-items-center`}>
                Nightwish
              </h4>
            </div>
          </a>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link
          href={{
            pathname: "/san-pham",
            query: { filter: "UnlimiteD" },
          }}
          passHref
        >
          <a>
            <div className={styles.sliderArtistItem }>
              <Image loading="eager" src={unlimited} alt="Unlimited" />
              <h4 className={`${styles.overlaySliderItem} d-flex align-items-center`}>
                UnlimiteD
              </h4>
            </div>
          </a>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link
          href={{
            pathname: "/san-pham",
            query: { filter: "Linkin Park" },
          }}
          passHref
        >
          <a>
            <div className={styles.sliderArtistItem }>
              <Image loading="eager" src={linkinPark} alt="Linkin Park" />
              <h4 className={`${styles.overlaySliderItem} d-flex align-items-center`}>
                Linkin Park
              </h4>
            </div>
          </a>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link
          href={{
            pathname: "/san-pham",
            query: { filter: "DragonForce" },
          }}
          passHref
        >
          <a>
            <div className={styles.sliderArtistItem }>
              <Image loading="eager" src={dragonForce} alt="DragonForce" />
              <h4 className={`${styles.overlaySliderItem} d-flex align-items-center`}>
                DragonForce
              </h4>
            </div>
          </a>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperSliderArtist;
