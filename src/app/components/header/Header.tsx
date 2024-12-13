import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";

function Header() {
  return (
    <header className={styles.header}>
      <Link href="/insight">
        <img src="/icon_review.svg" />
      </Link>
    </header>
  );
}

export default Header;
