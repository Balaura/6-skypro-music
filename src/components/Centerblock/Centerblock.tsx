import React from 'react';
import Search from '@/components/Search/Search';
import Filter from '@/components/Filter/Filter';
import Content from '@/components/Content/Content';
import styles from './Centerblock.module.css';

const Centerblock = () => {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.h2}>Треки</h2>
      <Filter />
      <Content />
    </div>
  );
};

export default Centerblock;