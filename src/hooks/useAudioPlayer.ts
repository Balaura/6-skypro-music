"use client";

import { useState, useRef, useEffect } from 'react';
import { Track } from '@/hooks/useFetchTracks';

export const useAudioPlayer = () => {
     const [isPlaying, setIsPlaying] = useState(false);
     const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
     const [isLooping, setIsLooping] = useState(false);
     const audioRef = useRef<HTMLAudioElement | null>(null);

     const handlePlay = async (track: Track) => {
          try {
               console.log('Playing track:', track);
               console.log('Current track ID:', track._id);
               console.log('Current track:', currentTrack);
               console.log('Audio ref:', audioRef.current);
               console.log('Is playing', currentTrack?._id !== track._id);

               if (currentTrack?._id !== track._id) {
                    console.log('Loading new track...');
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
                    console.log('Already playing track. Toggling play/pause...');
                    await togglePlayPause();
               }
          } catch (e) {
               console.error("Error playing audio:", e);
               setIsPlaying(false);
          }
     };

     const togglePlayPause = async () => {
          try {
               console.log('<xxx> Toggling play/pause...');
               console.log('Current track:', currentTrack);
               console.log('Audio ref:', audioRef.current);
               console.log('Is playing', currentTrack?._id);
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

     const toggleLooping = () => {
          setIsLooping(!isLooping);
          if (audioRef.current) {
               audioRef.current.loop = isLooping;
          }

          console.log('Looping:', isLooping);
          console.log('Audio ref:', audioRef.current);
          console.log('Is looping', audioRef.current?.loop);
     };

     useEffect(() => {
          audioRef.current = new Audio();
          audioRef.current.loop = isLooping;

          return () => {
               if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current = null;
               }
          };
     }, []);

     return { isPlaying, currentTrack, isLooping, handlePlay, togglePlayPause, toggleLooping };
};