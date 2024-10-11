import React, { useCallback, useEffect, useRef } from 'react';
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import styles from "./ProgressBar.module.css";

interface PlayerProps {
  audioPlayerState: ReturnType<typeof useAudioPlayer>;
}

export const ProgressBar: React.FC<PlayerProps> = ({ audioPlayerState }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const updateProgress = useCallback(() => {
    if (progressRef.current && thumbRef.current && audioPlayerState.audioRef.current) {
      const progress = (audioPlayerState.audioRef.current.currentTime / audioPlayerState.duration) * 100;
      progressRef.current.style.width = `${progress}%`;
      thumbRef.current.style.left = `${progress}%`;
    }
  }, [audioPlayerState]);

  useEffect(() => {
    const audioElement = audioPlayerState.audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateProgress);
      return () => {
        audioElement.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [audioPlayerState, updateProgress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    audioPlayerState.setNewCurrentTime(newTime);
    // updateProgress();
  };

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBarTrack}>
        <div ref={progressRef} className={styles.progressBarFill}></div>
      </div>
      <div ref={thumbRef} className={styles.progressBarThumb}></div>
      <input
        className={styles.progressBarInput}
        type="range"
        min="0"
        max={audioPlayerState.duration}
        value={audioPlayerState.audioRef.current?.currentTime || 0}
        step={0.0001}
        onChange={handleChange}
      />
    </div>
  );
}