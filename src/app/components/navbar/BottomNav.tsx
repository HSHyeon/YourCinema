import React from "react";
import Link from "next/link";

import styles from "./BottomNav.module.css";
import { usePathname } from "next/navigation";

function BottomNav() {
  const router = usePathname(); // 현재 경로를 가져옵니다

  return (
    <div className={styles.bottomNav}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              href="/"
              className={`${styles.navLink} ${router === "/" ? styles.active : ""}`}
            >
              <img src="/icon_movie.svg" />
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/calendar"
              className={`${styles.navLink} ${router === "/calendar" ? styles.active : ""}`}
            >
              <img src="/icon_ticket.svg" />
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/add"
              className={`${styles.navLink} ${router === "/add" ? styles.active : ""}`}
            >
              <img src="/icon_film.svg" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default BottomNav;
