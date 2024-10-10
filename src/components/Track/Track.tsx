"use client";

import React from 'react';
import styles from './Track.module.css';
import { Track as TrackType } from '@/hooks/useFetchTracks';

interface TrackProps extends TrackType {
  isPlaying: boolean;
  onPlay: () => void;
}

const Track: React.FC<TrackProps> = ({ name, author, album, duration_in_seconds, isPlaying, onPlay }) => {
  const minutes = Math.floor(duration_in_seconds / 60);
  const seconds = duration_in_seconds % 60;
  const formatDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return (
    <div className={styles.item}>
      <div className={styles.track}>
        <div className={styles.title}>
          <div className={styles.titleImage} onClick={onPlay}>
            <svg className={styles.titleSvg}>
              <use xlinkHref={`img/icon/sprite.svg#icon-${isPlaying ? 'pause' : 'note'}`}></use>
            </svg>
          </div>
          <div className={styles.titleText}>
            <a className={styles.titleLink} onClick={(e) => { e.preventDefault(); onPlay(); }}>
              {name || 'Неизвестный трек'}
              <span className={styles.titleSpan}></span>
            </a>
          </div>
        </div>
        <div className={styles.author}>
          <a className={styles.authorLink} href="#">
            {author || 'Неизвестный исполнитель'}
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