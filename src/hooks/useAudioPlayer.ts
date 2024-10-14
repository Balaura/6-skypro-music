"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import {
  setIsPlaying,
  setCurrentTrack,
  setPlaylist,
  setIsShuffling,
  setIsLooping,
  setVolume,
  setCurrentTime,
} from '@/store/features/audioPlayerSlice';
import audioPlayer from '@/utils/audioPlayer';
import { Track } from '@/hooks/useFetchTracks';

export const useAudioPlayer = () => {
  const dispatch = useDispatch();
  const {
    isPlaying,
    currentTrack,
    playlist,
    isShuffling,
    isLooping,
    volume,
    currentTime,
  } = useSelector((state: RootState) => state.audioPlayer);

  const [duration, setDuration] = useState(0);
  const audio = audioPlayer.getAudioElement();

  useEffect(() => {
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => dispatch(setCurrentTime(audio.currentTime));
    const handleEnded = () => {
      // dispatch(setIsPlaying(false));
      handleTrackEnd();
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', playNextTrack);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [dispatch, audio, currentTrack]);

  const togglePlayPause = useCallback(() => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else if (currentTrack) {
      audio.play().catch(error => console.error('Error playing audio:', error));
    }
    dispatch(setIsPlaying(!isPlaying));
  }, [isPlaying, currentTrack, dispatch, audio]);

  const handlePlay = useCallback((track: Track, newPlaylist: Track[]) => {
    if (!audio) return;

    const playAudio = () => {
      audio.play().catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Error playing audio:', error);
        }
      });
    };

    if (currentTrack?._id !== track._id) {
      dispatch(setCurrentTrack(track));
      audio.src = track.track_file;

      // Добавляем слушатель события 'canplay'
      const canPlayHandler = () => {
        playAudio();
        audio.removeEventListener('canplay', canPlayHandler);
      };
      audio.addEventListener('canplay', canPlayHandler);

      // Устанавливаем состояние воспроизведения
      dispatch(setIsPlaying(true));
    } else {
      togglePlayPause();
    }
  }, [currentTrack, dispatch, togglePlayPause, audio]);

  const setNewVolume = useCallback((newVolume: number) => {
    if (!audio) return;
    audio.volume = newVolume;
    dispatch(setVolume(newVolume));
  }, [dispatch]);

  const setNewCurrentTime = useCallback((newTime: number) => {
    if (!audio) return;
    audio.currentTime = newTime;
    dispatch(setCurrentTime(newTime));
  }, [dispatch]);

  const toggleShuffle = useCallback(() => {
    dispatch(setIsShuffling(!isShuffling));
  }, [isShuffling, dispatch]);

  const toggleLooping = useCallback(() => {
    if (!audio) return;
    audio.loop = !isLooping;
    dispatch(setIsLooping(!isLooping));
  }, [isLooping, dispatch]);



  const playNextTrack = useCallback(() => {
    if (playlist.length === 0 || !currentTrack) return;

    const currentIndex = playlist.findIndex(track => track._id === currentTrack?._id);
    let nextIndex = isShuffling
      ? Math.floor(Math.random() * playlist.length)
      : currentIndex + 1;

    if (nextIndex >= playlist.length) return;

    const nextTrack = playlist[nextIndex];
    // Здесь вызов handlePlay
    if (currentTrack?._id !== nextTrack._id) {
      dispatch(setCurrentTrack(nextTrack));
      handlePlay(nextTrack, playlist);
    }
  }, [playlist, currentTrack, isShuffling, handlePlay]);

  const handleTrackEnd = useCallback(() => {
    setTimeout(() => {
      playNextTrack();
    }, 100);
  }, [playNextTrack]);


  const playPreviousTrack = useCallback(() => {
    if (playlist.length === 0 || !currentTrack) return;

    const currentIndex = playlist.findIndex(track => track._id === currentTrack._id);
    let previousIndex = isShuffling
      ? Math.floor(Math.random() * playlist.length)
      : currentIndex - 1;
    if (previousIndex < 0) {
      return;
    }
    const previousTrack = playlist[previousIndex];
    handlePlay(previousTrack, playlist);
  }, [playlist, currentTrack, isShuffling, handlePlay]);

  useEffect(() => {
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  // Sync audio.currentTime with Redux state
  useEffect(() => {
    if (!audio) return;
    if (Math.abs(audio.currentTime - currentTime) > 0.5) {
      audio.currentTime = currentTime;
    }
  }, [currentTime]);

  return {
    isPlaying,
    currentTrack,
    playlist,
    isLooping,
    isShuffling,
    volume,
    currentTime,
    duration,
    handlePlay,
    togglePlayPause,
    toggleLooping,
    toggleShuffle,
    setVolume: setNewVolume,
    setCurrentTime: setNewCurrentTime,
    playNextTrack,
    playPreviousTrack,
  };
};