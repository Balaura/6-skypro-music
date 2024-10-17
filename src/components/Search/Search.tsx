import React, { useState, useEffect } from 'react';
import styles from './Search.module.css';

const Search = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      />
    </div>
  );
};

export default Search;