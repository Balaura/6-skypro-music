"use client";

import React from 'react';
import styles from './Player.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

const Player: React.FC = () => {
  const { isPlaying, togglePlayPause } = useAudioPlayer();

  return (
    <div className={styles.player}>
      <div className={styles.controls}>
        <div className={styles.btnPrev}>
          <svg className={styles.btnPrevSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
          </svg>
        </div>
        <div className={`${styles.btnPlay} ${styles._btn}`} onClick={togglePlayPause}>
          <svg className={styles.btnPlaySvg}>
            <use xlinkHref={`img/icon/sprite.svg#icon-${isPlaying ? 'pause' : 'play'}`}></use>
          </svg>
        </div>
        <div className={styles.btnNext}>
          <svg className={styles.btnNextSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
          </svg>
        </div>
        <div className={`${styles.btnRepeat} ${styles._btnIcon}`}>
          <svg className={styles.btnRepeatSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
          </svg>
        </div>
        <div className={`${styles.btnShuffle} ${styles._btnIcon}`}>
          <svg className={styles.btnShuffleSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Player;