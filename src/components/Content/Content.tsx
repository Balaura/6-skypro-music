import React from 'react';
import PlaylistTitle from '@/components/PlaylistTitle/PlaylistTitle';
import Playlist from '@/components/Playlist/Playlist';
import styles from './Content.module.css';
import { Track } from '@/hooks/useFetchTracks';

interface ContentProps {
  tracks: Track[];
}

const Content: React.FC<ContentProps> = ({ tracks }) => {
  return (
    <div className={styles.content}>
      <PlaylistTitle />
      <Playlist tracks={tracks} />
    </div>
  );
};

export default Content;