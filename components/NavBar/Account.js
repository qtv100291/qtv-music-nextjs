import React from 'react';
import styles from './NavbarIconItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AccountIcon = () => {
    return ( 
    <div className={`user-icon-part ${styles.navbarIconItem}`}>
        <FontAwesomeIcon  icon = "user-check" className="real-font-awesome icon-navbar"/>
    </div>);
}

export default AccountIcon;