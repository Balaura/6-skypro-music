import React, { useState } from 'react';
import styles from './TrackPlay.module.css';
import { Track } from '@/hooks/useFetchTracks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addTrackToFavorites, removeTrackFromFavorites } from '@/api/api';
import { addToFavorites, removeFromFavorites } from '@/store/features/audioPlayerSlice';

interface TrackPlayProps {
  currentTrack: Track;
}

const TrackPlay: React.FC<TrackPlayProps> = ({ currentTrack }) => {
  const _id = currentTrack._id;
  const dispatch = useDispatch();
  const favoriteTracks = useSelector((state: RootState) => state.audioPlayer.favoriteTracks);
  const isFavorite = favoriteTracks.includes(currentTrack._id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setError(null);
    try {
      if (isFavorite) {
        await removeTrackFromFavorites(_id);
        dispatch(removeFromFavorites(_id));
      } else {
        await addTrackToFavorites(_id);
        dispatch(addToFavorites(_id));
      }
    } catch (error) {
      console.error('Ошибка при обновлении избранного:', error);
      setError('Не удалось обновить избранное');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.trackPlay}>
      <div className={styles.contain}>
        <div className={styles.image}>
          <svg className={styles.svg}>
            <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
          </svg>
        </div>
        <div className={styles.author}>
          <a className={styles.authorLink} href="#">
            {currentTrack?.name}
          </a>
        </div>
        <div className={styles.album}>
          <a className={styles.albumLink} href="#">
            {currentTrack?.author}
          </a>
        </div>
      </div>
      <div className={styles.likeDis}>
        <button
          className={`${styles.likeBtn} ${isFavorite ? styles.liked : ''}`}
          onClick={handleLike}
          disabled={isLoading}
        >
          <svg className={styles.likeSvg}>
            <use xlinkHref={isFavorite ? "img/icon/sprite.svg#icon-like" : "img/icon/sprite.svg#icon-dislike"}></use>
          </svg>
        </button>
        <div className={`${styles.like} ${styles._btnIcon}`}>
          <svg className={styles.likeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
          </svg>
        </div>
        <div className={`${styles.dislike} ${styles._btnIcon}`}>
          <svg className={styles.dislikeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TrackPlay;