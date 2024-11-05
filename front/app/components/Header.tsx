"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css"; // Import header styles
import "../globals.css"; // Ensure global styles are applied

const Header: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <div
          className={styles.logo}
          onClick={() => {
            router.push("/");
          }}
        >
          ZeroApp
        </div>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          &#9776; {/* Menu icon (hamburger) */}
        </div>
      </header>
      <div className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/help">Help</a>
          </li>
        </ul>
      </div>
      {menuOpen && <div className={styles.overlay} onClick={toggleMenu} />}{" "}
      {/* Overlay for closing the menu */}
    </>
  );
};

export default Header;
