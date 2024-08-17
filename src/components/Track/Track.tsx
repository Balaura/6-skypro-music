import React from 'react';
import styles from './Track.module.css';
// @ts-ignore
const Track = ({ title, artist, album, time }) => {
  return (
    <div className={styles.item}>
      <div className={styles.track}>
        <div className={styles.title}>
          <div className={styles.titleImage}>
            <svg className={styles.titleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className={styles.titleText}>
            <a className={styles.titleLink} href="#">
              {title} <span className={styles.titleSpan}></span>
            </a>
          </div>
        </div>
        <div className={styles.author}>
          <a className={styles.authorLink} href="#">
            {artist}
          </a>
        </div>
        <div className={styles.album}>
          <a className={styles.albumLink} href="#">
            {album}
          </a>
        </div>
        <div className={styles.time}>
          <svg className={styles.timeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.timeText}>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default Track;