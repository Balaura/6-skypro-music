import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  setSearchKeyword,
  setSelectedArtists,
  setSelectedGenres,
  setSelectedYear,
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

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filterOptions = useMemo(() => ({
    artists: [...new Set(playlist.map(track => track.author))],
    genres: [...new Set(playlist.flatMap(track => track.genre))],
    years: [...new Set(playlist.map(track => new Date(track.release_date).getFullYear().toString()))]
  }), [playlist]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const handleFilterToggle = (filter: string, item: string) => {
    switch (filter) {
      case 'artist':
        dispatch(setSelectedArtists(
          selectedArtists.includes(item)
            ? selectedArtists.filter(a => a !== item)
            : [...selectedArtists, item]
        ));
        console.log(selectedArtists);
        console.log(item);
        console.log(filterOptions);
        console.log(selectedArtists.includes(item));
        break;
      case 'genre':
        dispatch(setSelectedGenres(
          selectedGenres.includes(item)
            ? selectedGenres.filter(g => g !== item)
            : [...selectedGenres, item]
        ));
        console.log(selectedGenres);
        console.log(item);
        console.log(filterOptions);
        console.log(selectedGenres.includes(item));
        break;
      case 'year':
        dispatch(setSelectedYear(selectedYear === item ? null : item));
        break;
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
              className={`${styles.button} ${activeFilters.includes(filter) ? styles.active : ''}`}
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
              {(filter === 'year' && selectedYear) && (
                <div className={styles.badgeCount}>1</div>
              )}
            </button>
            {activeFilters.includes(filter) && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownContent}>
                  {filterOptions[filter === 'artist' ? 'artists' : filter === 'genre' ? 'genres' : 'years'].map((item, index) => (
                    <div
                      key={index}
                      className={`${styles.dropdownItem} ${(filter === 'artist' && selectedArtists.includes(item)) ||
                        (filter === 'genre' && selectedGenres.includes(item)) ||
                        (filter === 'year' && selectedYear === item) ? styles.selected : ''
                        }`}
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
      <div className={styles.sortOptions}>
        <button
          className={`${styles.sortButton} ${sortOption === 'default' ? styles.active : ''}`}
          onClick={() => dispatch(setSortOption('default'))}
          aria-label="Сортировка по умолчанию"
        >
          По умолчанию
        </button>
        <button
          className={`${styles.sortButton} ${sortOption === 'new' ? styles.active : ''}`}
          onClick={() => dispatch(setSortOption('new'))}
          aria-label="Сортировка: сначала новые"
        >
          Сначала новые
        </button>
        <button
          className={`${styles.sortButton} ${sortOption === 'old' ? styles.active : ''}`}
          onClick={() => dispatch(setSortOption('old'))}
          aria-label="Сортировка: сначала старые"
        >
          Сначала старые
        </button>
      </div>
    </div>
  );
};

export default Filter;