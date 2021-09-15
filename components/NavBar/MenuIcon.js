import React from 'react';
import styles from './NavbarIconItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuIcon = ({ onOpening }) => {
    return ( 
        <div className={`menu-icon-part ${styles.navbarIconItem} d-flex align-items-center justify-content-center`} onClick ={onOpening}>
            <FontAwesomeIcon  icon ="bars" className="real-font-awesome icon-navbar"/>
        </div>
    );
}
 
export default MenuIcon;