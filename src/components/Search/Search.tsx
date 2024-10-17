import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearchKeyword } from '@/store/features/audioPlayerSlice';
import styles from './Search.module.css';

const Search = () => {
  const dispatch = useDispatch();
  const searchKeyword = useSelector((state: RootState) => state.audioPlayer.searchKeyword);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKeyword(e.target.value));
  };

  if (!isClient) {
    return <div className={styles.search}></div>;
  }

  return (
    <div className={styles.search}>
      <svg className={styles.svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchKeyword}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;