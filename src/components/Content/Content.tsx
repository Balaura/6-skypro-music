import React from 'react';
import PlaylistTitle from '@/components/PlaylistTitle/PlaylistTitle';
import Playlist from '@/components/Playlist/Playlist';
import styles from './Content.module.css';

const Content = () => {
  return (
    <div className={styles.content}>
      <PlaylistTitle />
      <Playlist />
    </div>
  );
};

export default Content;
