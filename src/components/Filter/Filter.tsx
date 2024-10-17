import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  setSearchKeyword,
  setSelectedArtists,
  setSelectedGenres,
  setSortOption
} from '@/store/features/audioPlayerSlice';
import styles from './Filter.module.css';

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const {
    searchKeyword,
    selectedArtists,
    selectedGenres,
    selectedYear,
    sortOption,
    playlist
  } = useSelector((state: RootState) => state.audioPlayer);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filterOptions = useMemo(() => ({
    artists: [...new Set(playlist.map(track => track.author))],
    genres: [...new Set(playlist.flatMap(track => track.genre))],
    years: ['По умолчанию', 'Сначала новые', 'Сначала старые']
  }), [playlist]);

  const toggleFilter = (filter: string) => {
    setActiveFilter(prevFilter => prevFilter === filter ? null : filter);
  };

  const handleFilterToggle = (filter: string, item: string) => {
    switch (filter) {
      case 'artist':
        dispatch(setSelectedArtists(
          selectedArtists.includes(item)
            ? selectedArtists.filter(a => a !== item)
            : [...selectedArtists, item]
        ));
        break;
      case 'genre':
        dispatch(setSelectedGenres(
          selectedGenres.includes(item)
            ? selectedGenres.filter(g => g !== item)
            : [...selectedGenres, item]
        ));
        break;
      case 'year':
        const sortOptionValue = item === 'Сначала новые' ? 'new' : item === 'Сначала старые' ? 'old' : 'default';
        dispatch(setSortOption(sortOptionValue));
        setActiveFilter(null);
        break;
    }
  };

  const isItemSelected = (filter: string, item: string) => {
    switch (filter) {
      case 'artist':
        return selectedArtists.includes(item);
      case 'genre':
        return selectedGenres.includes(item);
      case 'year':
        return (
          (item === 'По умолчанию' && sortOption === 'default') ||
          (item === 'Сначала новые' && sortOption === 'new') ||
          (item === 'Сначала старые' && sortOption === 'old')
        );
      default:
        return false;
    }
  };

  return (
    <div className={styles.filter}>
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
        placeholder="Поиск по названию или исполнителю"
        className={styles.searchInput}
        aria-label="Поиск по названию или исполнителю"
      />
      <div className={styles.title}>Искать по:</div>
      <div className={styles.filterButtons}>
        {['artist', 'genre', 'year'].map((filter) => (
          <div key={filter} className={styles.filterItem}>
            <button
              className={`${styles.button} ${activeFilter === filter ? styles.active : ''}`}
              onClick={() => toggleFilter(filter)}
              aria-label={`Фильтр по ${filter === 'artist' ? 'исполнителю' : filter === 'genre' ? 'жанру' : 'году выпуска'}`}
            >
              {filter === 'artist' ? 'исполнителю' : filter === 'genre' ? 'жанру' : 'году выпуска'}
              {(filter === 'artist' && selectedArtists.length > 0) && (
                <div className={styles.badgeCount}>{selectedArtists.length}</div>
              )}
              {(filter === 'genre' && selectedGenres.length > 0) && (
                <div className={styles.badgeCount}>{selectedGenres.length}</div>
              )}
              {(filter === 'year' && sortOption !== 'default') && (
                <div className={styles.badgeCount}>1</div>
              )}
            </button>
            {activeFilter === filter && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownContent}>
                  {filterOptions[filter === 'artist' ? 'artists' : filter === 'genre' ? 'genres' : 'years'].map((item, index) => (
                    <div
                      key={index}
                      className={`${styles.dropdownItem} ${isItemSelected(filter, item) ? styles.selected : ''}`}
                      onClick={() => handleFilterToggle(filter, item)}
                    >
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