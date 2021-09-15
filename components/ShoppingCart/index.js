import React, { useEffect } from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import addfunc from "../../utils/additionalFunction";
import styles from "./ShoppingCart.module.scss";
import Link from "next/link";
import additionalFunctionDom from "../../utils/additionalFunctionDom";
import { useSelector } from "react-redux";
import {
  selectShoppingCart,
  getTotalCountItem,
  getTotalMoney,
} from "../../store/shoppingCart";
import Head from "next/head";

const ShoppingCart = () => {
  const shoppingCart = useSelector(selectShoppingCart);
  const itemTotalNumber = useSelector(getTotalCountItem);
  const moneyTotalNumber = useSelector(getTotalMoney);

  useEffect(() => {
    document.title = "Giỏ Hàng";
    // onOpenLoadingScreen();
    additionalFunctionDom.fixBody();
    setTimeout(() => {
      // onCloseLoadingScreen();
      additionalFunctionDom.releaseBody();
    }, 700);
  }, []);
  if (!shoppingCart) return null;
  else
    return (
      <main className={styles.shoppingCartMain}>
        <Head>
          <title>Giỏ Hàng</title>
        </Head>
        <h2 className={styles.shoppingCartTitle}>
          Giỏ Hàng <span>( {itemTotalNumber} sản phẩm )</span>
        </h2>
        <div
          className={`${styles.shoppingCartContainer} d-flex justify-content-between`}
        >
          <section className={styles.listItemSection}>
            {shoppingCart.length === 0 ? (
              <h3>Chưa Có Sản Phẩm</h3>
            ) : (
              shoppingCart.map((item) => (
                <ShoppingCartItem key={item.id} {...item} />
              ))
            )}
          </section>
          <section className={styles.totalMoney}>
            <div className={styles.totalMoneyContainer}>
              <p
                className={`${styles.totalMoneyTitle} d-flex justify-content-between`}
              >
                Tạm Tính
                <span>{addfunc.separator1000(moneyTotalNumber)} VND</span>
              </p>
              <p
                className={`${styles.totalMoneyTax} d-flex justify-content-between`}
              >
                Thuế VAT{" "}
                <span>{addfunc.separator1000(moneyTotalNumber / 10)} VND</span>
              </p>
              <p
                className={`${styles.totalMoneyValue} d-flex justify-content-between align-items-center`}
              >
                TỔNG
                <span>
                  {addfunc.separator1000((moneyTotalNumber * 1.1).toFixed(0))}{" "}
                  VND
                </span>
              </p>
            </div>
            {shoppingCart.length !== 0 && (
              <Link href="thanh-toan" passHref>
                <a>
                  <div
                    className={`${styles.payoutButton} d-flex align-items-center justify-content-center`}
                  >
                    THANH TOÁN
                  </div>
                </a>
              </Link>
            )}
          </section>
        </div>
      </main>
    );
};

export default ShoppingCart;
