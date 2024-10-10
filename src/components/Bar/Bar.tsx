import React from 'react';
import Player from '@/components/Player/Player';
import TrackPlay from '@/components/TrackPlay/TrackPlay';
import Volume from '@/components/Volume/Volume';
import styles from './Bar.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { ProgressBar } from '../ProgressBar/ProgressBar';

interface BarProps {
  audioPlayerState: ReturnType<typeof useAudioPlayer>;

}

const Bar: React.FC<BarProps> = ({ audioPlayerState }) => {
  if (!audioPlayerState.currentTrack) {
    return null; // Скрываем Bar, если нет текущего трека
  }

  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <ProgressBar audioPlayerState={audioPlayerState} />
        <div className={styles.playerBlock}>
          <div className={styles.barPlayer}>
            <Player audioPlayerState={audioPlayerState} />
            <TrackPlay currentTrack={audioPlayerState.currentTrack} />
          </div>
          <Volume audioPlayerState={audioPlayerState} />
        </div>
      </div>
    </div>
  );
};


export default Bar;