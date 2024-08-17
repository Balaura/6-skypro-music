import React from 'react';
import Player from '@/components/Player/Player';
import TrackPlay from '@/components/TrackPlay/TrackPlay';
import Volume from '@/components/Volume/Volume';
import styles from './Bar.module.css';

const Bar = () => {
  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <div className={styles.playerProgress}></div>
        <div className={styles.playerBlock}>
          <Player />
          <TrackPlay />
          <Volume />
        </div>
      </div>
    </div>
  );
};

export default Bar;