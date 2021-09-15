import React from 'react';
import styles from './BreadCrumb.module.scss';
import  Link  from 'next/link';
import addfunc from '../../utils/additionalFunction';

const BreadCrumb = ({ title, titleParent, backgroundImage }) => {
    return ( 
        <div className={`${styles.bannerBreadcrumb}`} style={{backgroundImage}}>
            <div className={styles.overlayBannerBreadcrumb}></div>
            <h2>{title || titleParent}</h2>
            <ol className="breadcrumb-line d-flex justify-content-center align-items-center">
                <li><Link href="/">Trang Chủ</Link></li>
                <span>|</span>
                <li>{title ?  
                    <Link href={`/${addfunc.titlePath(titleParent)}`}>{titleParent}</Link>
                    : titleParent}
                </li>
                {title && <span>|</span>}
                {title && <li>{title}</li>}
            </ol>
        </div>
    );
}
 
export default BreadCrumb;
