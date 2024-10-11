"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Track } from '@/hooks/useFetchTracks';

export const useAudioPlayer = () => {
     const [isPlaying, setIsPlaying] = useState(false);
     const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
     const [isShuffling, setIsShuffling] = useState(false);
     const [playlist, setPlaylist] = useState<Track[]>([]);
     const [isLooping, setIsLooping] = useState(false);
     const [volume, setVolume] = useState(0.5);
     const audioRef = useRef<HTMLAudioElement | null>(null);
     const duration = audioRef.current?.duration || 0;
     const [currentTime, setCurrentTime] = useState(0);
     const [newCurrentTime, setNewCurrentTime] = useState(0);

     const togglePlayPause = () => {
          try {
               if (audioRef.current) {
                    if (isPlaying) {
                         audioRef.current.pause();
                    } else {
                         audioRef.current.play();
                    }
                    setIsPlaying(!isPlaying);
               }
          } catch (e) {
               console.error("Error toggling play/pause:", e);
               setIsPlaying(false);
          }
     };

     const toggleShuffle = () => {
          setIsShuffling(!isShuffling);
     };

     const handlePlay = useCallback((track: Track, playlist: Track[]) => {
          try {
               if (currentTrack?._id !== track._id) {
                    setPlaylist(playlist);
                    setCurrentTrack(track);
                    if (audioRef.current) {
                         audioRef.current.src = track.track_file;
                         audioRef.current.play();
                         setIsPlaying(true);
                    }
                    // if (audioRef.current) {
                    //      await audioRef.current.pause();
                    //      setIsPlaying(false);
                    // }
                    console.log('2currentTrack:', currentTrack);
               } else {
                    console.log('Already playing track. Toggling play/pause...');
                    togglePlayPause();
               }
          } catch (e) {
               console.error("Error playing audio:", e);
               setIsPlaying(false);
          }
     }, [currentTrack, togglePlayPause]);

     const handleTrackEndRef = useRef(() => { });

     //случайный трек
     const nextShuffle = useCallback(() => {
          if (!currentTrack || playlist.length === 0) return;
          const currentIndex = playlist.findIndex(track => track._id === currentTrack._id);
          const randomIndex = Math.floor(Math.random() * playlist.length);
          if (randomIndex === currentIndex) {
               nextShuffle();
          }
          const randomTrack = playlist[randomIndex];
          handlePlay(randomTrack, playlist);
     }, [currentTrack, playlist, handlePlay]);

     const playNextTrack = useCallback(() => {
          if (isShuffling) {
               nextShuffle();
               return;
          }
          if (!currentTrack || playlist.length === 0) return;
          const currentIndex = playlist.findIndex(track => track._id === currentTrack._id);
          const nextIndex = currentIndex + 1;
          if (nextIndex > playlist.length - 1) {
               return
          }
          const nextTrack = playlist[nextIndex];
          handlePlay(nextTrack, playlist);
     }, [currentTrack, playlist, handlePlay]);

     const playPreviousTrack = useCallback(() => {
          if (isShuffling) {
               nextShuffle();
               return;
          }
          if (!currentTrack || playlist.length === 0) return;
          const currentIndex = playlist.findIndex(track => track._id === currentTrack._id);
          const previousIndex = (currentIndex - 1)
          if (previousIndex < 0) return;
          const previousTrack = playlist[previousIndex];
          handlePlay(previousTrack, playlist);
     }, [currentTrack, playlist, handlePlay]);

     useEffect(() => {
          handleTrackEndRef.current = playNextTrack;
     }, [playNextTrack]);

     useEffect(() => {
          const handleTrackEnd = () => {
               handleTrackEndRef.current();
          };

          let timeoutId: number | undefined;

          const setupListener = () => {
               if (audioRef.current) {
                    console.log('Setting up event listeners...');
                    audioRef.current.addEventListener('ended', handleTrackEnd);
                    if (timeoutId !== undefined) {
                         clearTimeout(timeoutId);
                    }
               } else {
                    console.log('audioRef.current is null, retrying in 100ms...');
                    timeoutId = window.setTimeout(setupListener, 100);
               }
          };

          setupListener();

          return () => {
               if (timeoutId !== undefined) {
                    clearTimeout(timeoutId);
               }
               if (audioRef.current) {
                    audioRef.current.removeEventListener('ended', handleTrackEnd);
               }
          };
     }, []);



     const toggleLooping = useCallback(() => {
          console.log('toggling loop...');
          console.log('1audioRef.current.loop:', audioRef.current?.loop);
          console.log('1isLooping:', isLooping);

          setIsLooping((prevIsLooping) => {
               const newIsLooping = !prevIsLooping;
               console.log('New isLooping value:', newIsLooping);

               if (audioRef.current) {
                    audioRef.current.loop = newIsLooping;
                    console.log('2audioRef.current.loop:', audioRef.current.loop);
               }

               return newIsLooping;
          });
     }, [isLooping]);

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

     // регулировка громкости через ползунок
     useEffect(() => {
          if (audioRef.current) {
               audioRef.current.volume = volume;
          }
     }, [volume]);

     // Длительность проигрывания
     useEffect(() => {
          if (audioRef.current) {
               audioRef.current.ontimeupdate = () => {
                    setCurrentTime(audioRef.current?.currentTime || 0);

               };
          }
     }, []);

     // Перемотка трека
     useEffect(() => {
          if (audioRef.current) {
               audioRef.current.currentTime = newCurrentTime;
          }
     }, [newCurrentTime]);


     return { isPlaying, currentTrack, isLooping, handlePlay, togglePlayPause, toggleLooping, volume, setVolume, audioRef, duration, currentTime, setNewCurrentTime, playNextTrack, playPreviousTrack, toggleShuffle, isShuffling };
};

