"use client";

import { useState, useRef, useEffect } from 'react';
import { Track } from '@/hooks/useFetchTracks';

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async (track: Track) => {
    try {
      if (currentTrack?.id !== track.id) {
        if (audioRef.current) {
          await audioRef.current.pause();
        }
        setCurrentTrack(track);
        if (audioRef.current) {
          audioRef.current.src = track.track_file;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        await togglePlayPause();
      }
    } catch (e) {
      console.error("Error playing audio:", e);
      setIsPlaying(false);
    }
  };

  const togglePlayPause = async () => {
    try {
      if (audioRef.current) {
        if (isPlaying) {
          await audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    } catch (e) {
      console.error("Error toggling play/pause:", e);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { isPlaying, currentTrack, handlePlay, togglePlayPause };
};