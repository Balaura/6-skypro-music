import styles from './Volume.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

const Volume: React.FC = () => {
  const volume = useSelector((state: RootState) => state.audioPlayer.volume);
  const { setVolume } = useAudioPlayer();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className={styles.volumeBlock}>
      <div className={styles.content}>
        <div className={styles.image}>
          <svg className={styles.svg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
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
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Volume;
