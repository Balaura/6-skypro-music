import React from 'react';
import Player from '@/components/Player/Player';
import TrackPlay from '@/components/TrackPlay/TrackPlay';
import Volume from '@/components/Volume/Volume';
import styles from './Bar.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface BarProps {
  audioPlayerState: ReturnType<typeof useAudioPlayer>;

}

const Bar: React.FC<BarProps> = ({ audioPlayerState }) => {
  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <div className={styles.playerProgress}></div>
        <div className={styles.playerBlock}>
        <Player audioPlayerState={audioPlayerState} />
        <TrackPlay currentTrack={audioPlayerState.currentTrack} />
        {/* <TrackPlay /> */}
        <Volume />
        </div>
      </div>
    </div>
  );
};

// const Bar = ({ isPlaying, currentTrack, togglePlayPause }) => {
//   return (
//     <div className={styles.bar}>
//       {currentTrack && (
//         <div>
//           <span>{currentTrack.name}</span>
//           <span>{currentTrack.author}</span>
//         </div>
//       )}
//       <button onClick={togglePlayPause}>
//         {isPlaying ? 'Pause' : 'Play'}
//       </button>
//     </div>
//   );
// };

export default Bar;