"use client";

import React from 'react';
import Search from '@/components/Search/Search';
import Filter from '@/components/Filter/Filter';
import Content from '@/components/Content/Content';
import styles from './Centerblock.module.css';
import useFetchTracks from '@/hooks/useFetchTracks';

const Centerblock = () => {
  const { tracks, error, loading } = useFetchTracks();

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
        <Content tracks={tracks} />
      )}
    </div>
  );
};

export default Centerblock;