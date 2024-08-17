import React from 'react';
import styles from './Volume.module.css';

const Volume = () => {
  return (
    <div className={styles.volumeBlock}>
      <div className={styles.content}>
        <div className={styles.image}>
          <svg className={styles.svg}>
            <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
          </svg>
        </div>
        <div className={`${styles.progress} ${styles._btn}`}>
          <input
            className={`${styles.progressLine} ${styles._btn}`}
            type="range"
            name="range"
          />
        </div>
      </div>
    </div>
  );
};

export default Volume;
