import styles from './Volume.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface PlayerProps {
  audioPlayerState: ReturnType<typeof useAudioPlayer>;
}

const Volume: React.FC<PlayerProps> = ({ audioPlayerState }) => {

  return (
    <div className={styles.volumeBlock}>
      <div className={styles.content}>
        <div className={styles.image}>
          <svg className={styles.svg}>
            <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
          </svg>
        </div>
        <div className={`${styles.progress} ${styles._btn}`}>
          <input
            className={`${styles.progressLine} ${styles._btn}`}
            type="range"
            name="range"
            min="0"
            max="1"
            step="0.01"
            value={audioPlayerState.volume}
            onChange={(e) => audioPlayerState.setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default Volume;
