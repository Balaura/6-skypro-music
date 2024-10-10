"use client";

import React, { useState, useEffect } from 'react';
import styles from './Filter.module.css';
import { Track } from '@/hooks/useFetchTracks';

interface FilterProps {
  tracks: Track[];
}

const Filter: React.FC<FilterProps> = ({ tracks }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [artists, setArtists] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    if (tracks.length > 0) {
      const uniqueArtists = [...new Set(tracks.map(track => track.author))];
      const uniqueGenres = [...new Set(tracks.flatMap(track => track.genre))];
      const uniqueYears = [...new Set(tracks.map(track => new Date(track.release_date).getFullYear().toString()))];


      setArtists(uniqueArtists);
      setGenres(uniqueGenres);
      setYears(uniqueYears);
    }
  }, [tracks]);

  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.title}>Искать по:</div>
      <div
        className={`${styles.button} ${activeFilter === 'artist' ? styles.active : ''}`}
        onClick={() => toggleFilter('artist')}
      >
        исполнителю
      </div>
      {activeFilter === 'artist' && (
        <div className={styles.dropdown}>
          {artists.map((artist, index) => (
            <div key={index} className={styles.dropdownItem}>{artist}</div>
          ))}
        </div>
      )}
      <div
        className={`${styles.button} ${activeFilter === 'year' ? styles.active : ''}`}
        onClick={() => toggleFilter('year')}
      >
        году выпуска
      </div>
      {activeFilter === 'year' && (
        <div className={styles.dropdown}>
          {years.map((year, index) => (
            <div key={index} className={styles.dropdownItem}>{year}</div>
          ))}
        </div>
      )}
      <div
        className={`${styles.button} ${activeFilter === 'genre' ? styles.active : ''}`}
        onClick={() => toggleFilter('genre')}
      >
        жанру
      </div>
      {activeFilter === 'genre' && (
        <div className={styles.dropdown}>
          {genres.map((genre, index) => (
            <div key={index} className={styles.dropdownItem}>{genre}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;