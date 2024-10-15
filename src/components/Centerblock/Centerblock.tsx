"use client";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Search from '@/components/Search/Search';
import Filter from '@/components/Filter/Filter';
import styles from './Centerblock.module.css';
import Playlist from '@/components/Playlist/Playlist';

interface CenterblockProps {
  title?: string;
}

const Centerblock: React.FC<CenterblockProps> = ({
  title = "Треки"
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className={styles.search}></div>;
  }

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.h2}>{title}</h2>
      <Filter />
    
        <Playlist />
      
    </div>
  );
};

export default Centerblock;