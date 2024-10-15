"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '@/store/features/audioPlayerSlice';
import { addTrackToFavorites, removeTrackFromFavorites } from '@/api/api';
import { RootState } from '@/store/store';
import styles from './Track.module.css';
import { Track as TrackType } from '@/hooks/useFetchTracks';
interface TrackProps extends TrackType {
  isPlaying: boolean;
  isCurrentTrack: boolean;
  onPlay: () => void;
}

export interface Track {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  album: string;
  track_file: string;
}

const Track: React.FC<TrackProps> = ({ _id, name, author, album, duration_in_seconds, isPlaying, onPlay, isCurrentTrack }) => {
  const minutes = Math.floor(duration_in_seconds / 60);
  const seconds = duration_in_seconds % 60;
  const formatDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const dispatch = useDispatch();
  const favoriteTracks = useSelector((state: RootState) => state.audioPlayer.favoriteTracks);
  const isFavorite = favoriteTracks.includes(_id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const username = useSelector((state: RootState) => state.auth.username);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setError(null);

    if (!username) {
      alert("Пожалуйста, авторизуйтесь для добавления трека в избранное.");
      setIsLoading(false);
      return;
    }

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.track}>
        <div className={styles.title}>
          {/* для теста */}
          <div className={styles.titleImage} onClick={onPlay} data-testid="play-button">
            {isCurrentTrack ? (
              isPlaying ? (
                <div className={styles.playing_dot} data-testid="playing-animation"></div>
              ) : (
                <div className={styles.not_playing_dot}></div>
              )
            ) : (
              <svg className={styles.titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note" />
              </svg>
            )}
          </div>

          <div className={styles.titleText}>
            <a className={styles.titleLink} onClick={(e) => { e.preventDefault(); onPlay(); }}>
              {name || 'Неизвестный трек'}
              <span className={styles.titleSpan}></span>
            </a>
          </div>
        </div>
        <div className={styles.author}>
          <a className={styles.authorLink} href="#">
            {author || 'Неизвестный исполнитель'}
          </a>
        </div>
        <div className={styles.album}>
          <a className={styles.albumLink} href="#">
            {album || 'Неизвестный альбом'}
          </a>
        </div>
        <div className={styles.time}>
          <button
            className={`${styles.likeBtn} ${isFavorite ? styles.liked : ''}`}
            onClick={handleLike}
            disabled={isLoading}
          >
            <svg className={styles.likeSvg}>
              <use xlinkHref={"/img/icon/sprite.svg#icon-like"}></use>
            </svg>
          </button>
          <span className={styles.timeText}>{formatDuration}</span>
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Track;