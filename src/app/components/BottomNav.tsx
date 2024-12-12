import React from "react";
import Link from "next/link";
import styles from "./BottomNav.module.css";

function BottomNav() {
  return (
    <div className={styles.bottomNav}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              HOME
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/calendar" className={styles.navLink}>
              CALENDAR
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.navLink}>
              REVIEW
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/add" className={styles.navLink}>
              ADD
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BottomNav;
