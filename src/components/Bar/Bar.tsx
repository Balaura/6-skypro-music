"use client";

import React from 'react';
import Player from '@/components/Player/Player';
import TrackPlay from '@/components/TrackPlay/TrackPlay';
import Volume from '@/components/Volume/Volume';
import styles from './Bar.module.css';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import TimeTrack from '../TimeTrack/TimeTrack';
import Skeleton from '../Skeleton/Skeleton';

const Bar: React.FC = () => {
  const currentTrack = useSelector((state: RootState) => state.audioPlayer.currentTrack);
  const isLoading = useSelector((state: RootState) => state.audioPlayer.isLoading);

  if (!currentTrack) {
    return null; // Скрываем Bar, если нет текущего трека
  }

  {currentTrack && <TrackPlay currentTrack={currentTrack} />}  // для теста
  
    return (
      <div className={styles.bar}>
        <div className={styles.content}>
          <ProgressBar />
          <div className={styles.playerBlock}>
            <div className={styles.barPlayer}>
              <Player />
              {isLoading ? <Skeleton type="bar" /> : <TrackPlay currentTrack={currentTrack} /> }
                          </div>
            <TimeTrack />
            <Volume />
          </div>
        </div>
      </div>
    );
  }


export default Bar;