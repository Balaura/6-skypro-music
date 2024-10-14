import React from 'react';
import styles from './Search.module.css';

const Search = () => {
  return (
    <div className={styles.search}>
      <svg className={styles.svg}>
        <use xlinkHref="img/icon/sprite.svg#icon-search"></use>
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