import React, { useState } from "react";
import styles from "./ShoppingCartItem.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import addfunc from "../../utils/additionalFunction";
import { useDispatch } from "react-redux";
import shoppingCartFunc from "../../utils/shoppingCartFunc";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import {
  cartMinusItem,
  cartPlusItem,
  cartDeleteItem,
  cartChangeQuantity,
  cartCheckEmpty,
} from "../../store/shoppingCart";
import Image from "next/image";

const ShoppingCartItem = ({ id, name, count, image, price, bandName }) => {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const productPath =
    "/san-pham/" + (name && name.replace(/ /g, "-")) + "-" + id;
  const dispatch = useDispatch();

  const minusQuantity = () => {
    if (count === 1) return;
    dispatch(cartMinusItem({ id }));
  };

  const plusQuantity = () => {
    if (count === 99) return;
    dispatch(cartPlusItem({ id }));
  };

  const deleteItem = () => {
    dispatch(cartDeleteItem({ id }));
  };

  const changeQuantity = ({ currentTarget: input }) => {
    const value = addfunc.checkOnly2Digit(input.value);
    dispatch(
      cartChangeQuantity({
        id,
        count: value,
      })
    );
  };

  const checkEmpty = ({ currentTarget: input }) => {
    if (input.value !== "") return;
    else dispatch(cartCheckEmpty({ id }));
  };

  const removeSomeCharacter = (event) => {
    // not allow to press button e, + , -, . on keyboard
    const invalidKey = [69, 187, 189, 190];
    if (invalidKey.includes(event.keyCode)) {
      event.preventDefault();
    }
  };

  return (
    <div className={`${styles.shoppingCartItem} d-flex justify-content-center`}>
      <Modal
        show={isModalShowing}
        onHide={() => setIsModalShowing(false)}
        centered={true}
      >
        <ModalBody>Bạn muốn xóa sản phẩm này ?</ModalBody>
        <ModalFooter>
          <Button variant="outline-secondary" onClick={()=> setIsModalShowing(false)}>Không</Button>
          <Button variant="danger" onClick={deleteItem}>Đồng Ý</Button>
        </ModalFooter>
      </Modal>
      <div className={styles.itemPhoto}>
        <div className={styles.itemPhotoContainer}>
          <Image loading="eager" src={image} alt={name} layout="fill" />
        </div>
      </div>
      <div className={`${styles.itemInfo} d-flex justify-content-between`}>
        <div className={styles.itemInfoContainer}>
          <Link href={productPath} passHref>
            <a>
              <h3 className={styles.albumName}>{name}</h3>
            </a>
          </Link>
          <h3 className={styles.bandName}>{bandName}</h3>
          <h3 className={styles.albumPrice}>{price} VND</h3>
          <div
            className={`${styles.deleteButton} d-flex align-items-center`}
            onClick={() =>{
              console.log("hehe")
              setIsModalShowing(true)
            } }
          >
            <FontAwesomeIcon icon="trash" className="real-font-awesome" />
            Xóa
          </div>
        </div>
        <div className={`${styles.itemQuantity} d-flex align-items-center`}>
          <div
            className={`minus-button ${styles.buttonQuantity} d-flex justify-content-center align-items-center`}
            onClick={minusQuantity}
          >
            <FontAwesomeIcon icon="minus" className="real-font-awesome" />
          </div>
          <input
            type="text"
            value={count}
            onChange={changeQuantity}
            onBlur={checkEmpty}
            onKeyDown={removeSomeCharacter}
          />
          <div
            className={`plus-button ${styles.buttonQuantity} d-flex justify-content-center align-items-center`}
            onClick={plusQuantity}
          >
            <FontAwesomeIcon icon="plus" className="real-font-awesome" />
          </div>
        </div>
        <div
          className={`${styles.itemTotalMoney} d-flex justify-content-center align-items-center flex-column`}
        >
          <h3 className={styles.itemTotalMoneyTitle}>Thành Tiền:</h3>
          <h3>
            <strong>
              {addfunc.separator1000(price.replace(/\D/g, "") * count)} VND
            </strong>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
