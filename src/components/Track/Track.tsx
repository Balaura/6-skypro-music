import React from 'react';
import styles from './Track.module.css';
import { Track as TrackType } from '@/hooks/useFetchTracks';

const Track: React.FC<TrackType> = ({ title, artist, album, duration }) => {
  // const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A'; // INFO Это вывод только года
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const formatDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

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
              {title || 'Неизвестный трек'} <span className={styles.titleSpan}></span>
            </a>
          </div>
        </div>
        <div className={styles.author}>
          <a className={styles.authorLink} href="#">
            {artist || 'Неизвестный исполнитель'}
          </a>
        </div>
        <div className={styles.album}>
          <a className={styles.albumLink} href="#">
            {album || 'Неизвестный альбом'}
          </a>
        </div>
        <div className={styles.time}>
          <svg className={styles.timeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.timeText}>{formatDuration}</span>
        </div>
      </div>
    </div>
  );
};

export default Track;