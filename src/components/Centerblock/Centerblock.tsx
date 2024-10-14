"use client";

import React from 'react';
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
  const { playlist, isLoading } = useSelector((state: RootState) => state.audioPlayer);

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