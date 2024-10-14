"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './TimeTrack.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { RootState } from '@/store/store';

const formatTime = (time: number): string => {
     const minutes = Math.floor(time / 60);
     const seconds = Math.floor(time % 60);
     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const TimeTrack: React.FC = () => {
     const { currentTime } = useSelector((state: RootState) => state.audioPlayer);
     const {
          duration,
     } = useAudioPlayer();

     const [displayTime, setDisplayTime] = useState({ current: '0:00', duration: '0:00' });

     useEffect(() => {
          const updateTime = () => {
               setDisplayTime({
                    current: formatTime(currentTime),
                    duration: formatTime(duration)
               });
          };

          updateTime();
          const timer = setInterval(updateTime, 1000);

          return () => clearInterval(timer);
     }, [currentTime, duration]);

     return (
          <div className={styles.time}>
               <div className={styles.current}>{displayTime.current} / {displayTime.duration}</div>
          </div>
     );
};

export default TimeTrack;