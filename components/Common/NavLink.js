import React from "react";
import Link from "next/link";
import styles from "./NavLink.module.scss";
import { useRouter } from "next/router";

const NavLink = ({href, exact, children, ...props}) => {
  const { pathname } = useRouter();
  // console.log(pathname)
  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href);
  return (
    <Link href={href} passHref>
      <a
        className={
          isActive
            ? `${styles.navbarPageItem} ${styles.activeLink}`
            : `${styles.navbarPageItem}`
        }
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
