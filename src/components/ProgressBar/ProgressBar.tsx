import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import styles from "./ProgressBar.module.css";

interface PlayerProps {
     audioPlayerState: ReturnType<typeof useAudioPlayer>;
}

export const ProgressBar: React.FC<PlayerProps> = ({ audioPlayerState }) => {
     return (
          <input
               className={styles.styledProgressInput}
               type="range"
               min="0"
               max={audioPlayerState.duration}
               value={audioPlayerState.audioRef.current?.currentTime || 0}
               step={0.01}
               onChange={(e) => audioPlayerState.setNewCurrentTime(Number(e.target.value))}
          />
     );
}
