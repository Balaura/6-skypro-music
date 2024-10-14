"use client";
import React from 'react';
import Image from 'next/image';
import styles from './Sidebar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/features/authSlice';
import { clearFavoriteTracks } from '@/store/features/audioPlayerSlice';

const Sidebar = () => {
  const username = useSelector((state: RootState) => state.auth.username);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearFavoriteTracks());
    router.push('/signin');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.personal}>
        <p className={styles.personalName}>{username || 'Гость'}</p>
        <div className={styles.icon} onClick={handleLogout}>
          <svg>
            <use xlinkHref="img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.list}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.item}>
              <a className={styles.link} href="#">
                <Image
                  className={styles.img}
                  src={`/img/playlist0${i}.png`}
                  alt={`Playlist ${i}`}
                  width={250}
                  height={150}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;