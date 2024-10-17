import React from 'react';
import styles from './PlaylistTitle.module.css';

const PlaylistTitle = () => {
  return (
    <div className={styles.playlistTitle}>
      <div className={`${styles.col} ${styles.col01}`}>Трек</div>
      <div className={`${styles.col} ${styles.col02}`}>ИСПОЛНИТЕЛЬ</div>
      <div className={`${styles.col} ${styles.col03}`}>АЛЬБОМ</div>
      <div className={`${styles.col} ${styles.col04}`}>
        <svg className={styles.svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
  );
};

export default PlaylistTitle;