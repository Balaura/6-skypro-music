"use client";

import React from 'react';
import styles from './Player.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface PlayerProps {
  audioPlayerState: ReturnType<typeof useAudioPlayer>;
}

const Player: React.FC<PlayerProps> = ({ audioPlayerState }) => {
  const { isPlaying, isLooping, togglePlayPause, toggleLooping, playNextTrack, playPreviousTrack, toggleShuffle, isShuffling } = audioPlayerState;

  return (
    <div className={styles.player}>
      <div className={styles.controls}>
        <div className={styles.btnPrev} onClick={playPreviousTrack}>
          <svg className={styles.btnPrevSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
          </svg>
        </div>
        <div className={`${styles.btnPlay} ${styles._btn}`} onClick={togglePlayPause}>
          <svg className={styles.btnPlaySvg}>
            <use xlinkHref={`img/icon/sprite.svg#icon-${isPlaying ? 'pause' : 'play'}`}></use>
          </svg>
        </div>
        <div className={styles.btnNext} onClick={playNextTrack}>
          <svg className={styles.btnNextSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
          </svg>
        </div>
        <div className={`${styles.btnRepeat} ${styles._btnIcon} ${isLooping ? styles.active : ''}`} onClick={toggleLooping}>
          <svg className={styles.btnRepeatSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
          </svg>
        </div>
        <div className={`${styles.btnShuffle} ${styles._btnIcon} ${isShuffling ? styles.active : ''}`} onClick={toggleShuffle}>
          <svg className={styles.btnShuffleSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Player;