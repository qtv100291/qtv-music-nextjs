import React, { useEffect } from "react";
import addfunc from "../../utils/additionalFunction";
import styles from "./UserTradeHistory.module.scss";
import { useSelector } from "react-redux";
import { selectTradeHistory } from "../../store/authentication";
import Head from "next/head";

const UserTradeHisotry = () => {
  const tradeHistory = useSelector(selectTradeHistory);
  // console.log("trade history", tradeHistory);
  if (tradeHistory) return (
    <div className={styles.tradeHistory}>
      <Head>
        <title>Lịch Sử Giao Dịch</title>
      </Head>
      <h2>LỊCH SỬ GIAO DỊCH</h2>
      <div className={styles.tradeHistoryContainer}>
        {tradeHistory.length === 0 ? (
          <h3>Chưa Thực Hiện Giao Dịch</h3>
        ) : (
          <ul className={styles.tradeHistoryList}>
            {tradeHistory.slice(0).reverse().map((item, index) => (
              <li className={styles.tradeHistoryItem} key={index}>
                <h3>{item.name}</h3>
                <p>Số lượng: {item.count}</p>
                <p>Ngày đặt hàng: {item.time}</p>
                <p>
                  Tổng tiền:{" "}
                  {addfunc.separator1000(
                    item.price.replace(/\./g, "") * item.count
                  )}{" "}
                  VND
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
  else return null
};

export default UserTradeHisotry;
