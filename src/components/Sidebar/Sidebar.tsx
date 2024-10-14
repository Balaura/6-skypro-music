import React from 'react';
import Image from 'next/image';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.personal}>
        <p className={styles.personalName}>Sergey.Ivanov</p>
        <div className={styles.icon}>
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