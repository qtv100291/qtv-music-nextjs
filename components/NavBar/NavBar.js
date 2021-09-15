import React from 'react';
import Link  from 'next/link';
import NavLink from '../Common/NavLink';
import ShoppingIcon from './ShoppingIcon';
import SearchBar from './SearchBar';
import LoginIcon from './LogIn';
import AccountIcon from './Account';
import styles from './NavBar.module.scss';
import { useSelector } from 'react-redux';
import { isLogged, userData } from '../../store/authentication';


const NavBar = () => {
    const isLoggedUser = useSelector(isLogged);
    const { name } = useSelector(userData);
    return ( 
        <nav className={`${styles.navbarDesktop} justify-content-between align-items-center` } id="navbar-desktop">
            <div className={`${styles.navbarContainer}  d-flex justify-content-between align-items-center`}>
                <Link  href="/" passHref>
                    <h1 className={styles.navbarLogo}>QTV Music</h1>
                </Link>
                <div className={styles.navbarPage} >
                    <NavLink 
                        exact = {true}
                        href="/">
                            Trang Chủ
                    </NavLink>
                    <NavLink 
                        href="/san-pham">
                            Sản Phẩm
                    </NavLink>
                    <NavLink 
                        href="/blog">
                            Blog
                    </NavLink>
                    <NavLink 
                        href="/lien-he">
                            Liên Hệ
                    </NavLink>
                </div>
                <div className="navbar-icon d-flex">
                    <SearchBar idInput = {"search-bar-deskhrefp"}/>
                    <NavLink 
                        style ={{marginLeft:"25px"}}
                        title = "Giỏ Hàng"
                        href="/gio-hang">
                            <ShoppingIcon />
                    </NavLink>
                    <NavLink 
                        style ={{marginLeft:"25px"}}
                        title = {isLoggedUser ? `Xin chào ${name}` : "Đăng Nhập"}
                        href={isLoggedUser ? "/tai-khoan/thong-tin-tai-khoan" : "/dang-nhap"}>
                            {isLoggedUser ? <AccountIcon /> : <LoginIcon/>}
                    </NavLink>
                </div>
                </div>
        </nav>
     );
}

export default NavBar;
