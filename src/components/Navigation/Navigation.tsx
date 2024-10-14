'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/features/authSlice';
import { clearFavoriteTracks } from '@/store/features/audioPlayerSlice';


const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const username = useSelector((state: RootState) => state.auth.username);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(clearFavoriteTracks());
    router.push('/signin');
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
            {username && <li className={styles.menuItem}><Link href="/my-playlist" className={styles.menuLink}>Избранное</Link></li>}
            <li className={styles.menuItem}>
              {username ? (
                <Link href="/signin" className={styles.menuLink} onClick={handleLogout}>
                  Выйти
                </Link>
              ) : (
                <Link href="/signin" className={styles.menuLink}>
                  Войти
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
