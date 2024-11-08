"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";
import "@/app/globals.css";

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
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/help">Help</Link>
          </li>
        </ul>
      </div>
      {menuOpen && <div className={styles.overlay} onClick={toggleMenu} />}{" "}
      {/* Overlay for closing the menu */}
    </>
  );
};

export default Header;
