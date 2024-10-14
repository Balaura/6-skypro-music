"use client";

import { useSelector } from 'react-redux';
import styles from './Player.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { RootState } from '@/store/store';

const Player: React.FC = () => {
  const { isPlaying, isLooping, isShuffling } = useSelector((state: RootState) => state.audioPlayer);
  const {
    togglePlayPause,
    toggleLooping,
    playNextTrack,
    playPreviousTrack,
    toggleShuffle,
  } = useAudioPlayer();

  return (
    <div className={styles.player}>
      <div className={styles.controls}>
        <div className={styles.btnPrev} onClick={playPreviousTrack}>
          <svg className={styles.btnPrevSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
          </svg>
        </div>
        <div className={`${styles.btnPlay} ${styles._btn}`} onClick={togglePlayPause}>
          <svg className={styles.btnPlaySvg}>
            <use xlinkHref={`/img/icon/sprite.svg#icon-${isPlaying ? 'pause' : 'play'}`}></use>
          </svg>
        </div>
        <div className={styles.btnNext} onClick={playNextTrack}>
          <svg className={styles.btnNextSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
          </svg>
        </div>
        <div className={`${styles.btnRepeat} ${styles._btnIcon} ${isLooping ? styles.active : ''}`} onClick={toggleLooping}>
          <svg className={styles.btnRepeatSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
          </svg>
        </div>
        <div className={`${styles.btnShuffle} ${styles._btnIcon} ${isShuffling ? styles.active : ''}`} onClick={toggleShuffle}>
          <svg className={styles.btnShuffleSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Player;