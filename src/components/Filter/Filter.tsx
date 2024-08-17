import React from 'react';
import styles from './Filter.module.css';

const Filter = () => {
  return (
    <div className={styles.filter}>
      <div className={styles.title}>Искать по:</div>
      <div className={`${styles.button} ${styles.buttonAuthor}`}>
        исполнителю
      </div>
      <div className={`${styles.button} ${styles.buttonYear}`}>
        году выпуска
      </div>
      <div className={`${styles.button} ${styles.buttonGenre}`}>жанру</div>
    </div>
  );
};

export default Filter;