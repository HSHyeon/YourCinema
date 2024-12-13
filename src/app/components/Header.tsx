import React from "react";
import styles from "./Header.module.css"; // CSS Module을 임포트

function Header() {
  return (
    <header className={styles.header}>
        <button><img src="icon_review.svg"/></button>
    </header>
  );
}

export default Header;
