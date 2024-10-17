"use client";

import React, { useState, useEffect } from 'react';
import styles from './Filter.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Filter: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [artists, setArtists] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  const { playlist } = useSelector((state: RootState) => state.audioPlayer);

  useEffect(() => {
    if (playlist.length > 0) {
      const uniqueArtists = [...new Set(playlist.map(track => track.author))];
      const uniqueGenres = [...new Set(playlist.flatMap(track => track.genre))];
      const uniqueYears = [...new Set(playlist.map(track => new Date(track.release_date).getFullYear().toString()))];

      setArtists(uniqueArtists);
      setGenres(uniqueGenres);
      setYears(uniqueYears);
    }
  }, [playlist]);

  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.title}>Искать по:</div>
      <div className={styles.filterButtons}>
        {['artist', 'year', 'genre'].map((filter) => (
          <div key={filter} className={styles.filterItem}>
            <button
              className={`${styles.button} ${activeFilter === filter ? styles.active : ''}`}
              onClick={() => toggleFilter(filter)}
            >
              {filter === 'artist' ? 'исполнителю' : filter === 'year' ? 'году выпуска' : 'жанру'}
            </button>
            {activeFilter === filter && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownContent}>
                  {(filter === 'artist' ? artists : filter === 'year' ? years : genres).map((item, index) => (
                    <div key={index} className={styles.dropdownItem}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;