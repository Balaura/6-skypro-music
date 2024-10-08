"use client";

import React from 'react';
import Search from '@/components/Search/Search';
import Filter from '@/components/Filter/Filter';
import styles from './Centerblock.module.css';
import useFetchTracks from '@/hooks/useFetchTracks';
import Playlist from '@/components/Playlist/Playlist';
import { Track } from '@/hooks/useFetchTracks';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface CenterblockProps {
  tracks: Track[];
  error: string | null;
  loading: boolean;
  audioPlayerState: ReturnType<typeof useAudioPlayer>;
}

const Centerblock: React.FC<CenterblockProps> = ({ tracks, error, loading, audioPlayerState }) => {

  // console.log('Tracks:', tracks);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.h2}>Треки</h2>
      <Filter tracks={tracks} />
      {loading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Playlist tracks={tracks} audioPlayerState={audioPlayerState} />
      )}
    </div>
  );
};

export default Centerblock;