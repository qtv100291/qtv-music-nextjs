import React, { Component } from 'react';
import styles from './NavbarIconItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTotalCountItem } from '../../store/shoppingCart';
import {  useSelector } from "react-redux";


const ShoppingIcon = () => {
    const itemTotalNumber = useSelector(getTotalCountItem) 
    return ( 
            <div className={`${styles.shoppingIconPart} ${styles.navbarIconItem}`}>
                <FontAwesomeIcon icon = "shopping-bag" className="real-font-awesome icon-navbar"/>
                <strong className="d-flex justify-content-center align-items-center">
                    {itemTotalNumber}
                </strong>
            </div>
    );
}
 
export default ShoppingIcon;