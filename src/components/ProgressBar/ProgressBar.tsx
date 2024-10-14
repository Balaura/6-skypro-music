import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import styles from "./ProgressBar.module.css";


export const ProgressBar: React.FC = () => {
  const { currentTime } = useSelector((state: RootState) => state.audioPlayer);
  const { setCurrentTime, duration } = useAudioPlayer();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
  };

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBarTrack}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
      </div>
      <div
        className={styles.progressBarThumb}
        style={{ left: `${(currentTime / duration) * 100}%` }}
      ></div>
      <input
        className={styles.progressBarInput}
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        step={0.1}
        onChange={handleChange}
      />
    </div>
  );
}