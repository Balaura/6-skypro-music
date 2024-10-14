import React from 'react';
import styles from './TrackPlay.module.css';
import { Track } from '@/hooks/useFetchTracks';

interface TrackPlayProps {
  currentTrack: Track | null;
}

const TrackPlay: React.FC<TrackPlayProps> = ({ currentTrack }) => {
  return (
    <div className={styles.trackPlay}>
      <div className={styles.contain}>
        <div className={styles.image}>
          <svg className={styles.svg}>
            <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
          </svg>
        </div>
        <div className={styles.author}>
          <a className={styles.authorLink} href="#">
            {currentTrack?.name}
          </a>
        </div>
        <div className={styles.album}>
          <a className={styles.albumLink} href="#">
            {currentTrack?.author}
          </a>
        </div>
      </div>
      <div className={styles.likeDis}>
        <div className={`${styles.like} ${styles._btnIcon}`}>
          <svg className={styles.likeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
          </svg>
        </div>
        <div className={`${styles.dislike} ${styles._btnIcon}`}>
          <svg className={styles.dislikeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TrackPlay;