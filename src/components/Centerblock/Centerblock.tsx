"use client";

import React from 'react';
import Search from '@/components/Search/Search';
import Filter from '@/components/Filter/Filter';
import styles from './Centerblock.module.css';
import useFetchTracks from '@/hooks/useFetchTracks';
import Playlist from '@/components/Playlist/Playlist';

const Centerblock: React.FC = () => {
  const { tracks, error, loading } = useFetchTracks();
  console.log('Tracks:', tracks);
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
        <Playlist tracks={tracks} />
      )}
    </div>
  );
};

export default Centerblock;