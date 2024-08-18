'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image className={styles.logoImage} src="/img/logo.png" alt="Logo" width={113} height={17} style={{ height: 'auto' }} priority />
      </div>
      <div className={styles.burger} onClick={toggleMenu}> { }
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      {isMenuOpen && (
        <div className={styles.menu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}><Link href="/" className={styles.menuLink}>Главное</Link></li>
            <li className={styles.menuItem}><Link href="/my-playlist" className={styles.menuLink}>Мой плейлист</Link></li>
            <li className={styles.menuItem}><Link href="/signin" className={styles.menuLink}>Войти</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
