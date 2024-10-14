"use client";

import React from 'react';
import Track from '@/components/Track/Track';
import styles from './Playlist.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import PlaylistTitle from '../PlaylistTitle/PlaylistTitle';

const Playlist: React.FC = () => {
  const { handlePlay } = useAudioPlayer();
  const { isPlaying, currentTrack, playlist } = useSelector((state: RootState) => state.audioPlayer);

  const uniqueIds = new Set(playlist.map(track => track._id));

  if (uniqueIds.size !== playlist.length) {
    console.error('WARNING: Duplicate track ids detected!');
  }

  return (
    <div className={styles.playlist}>
      <PlaylistTitle />
      {playlist && playlist.length > 0 ? (
        playlist.map((track) => (
          <Track
            key={track._id}
            {...track}
            isPlaying={isPlaying}
            isCurrentTrack={currentTrack?._id === track._id}
            onPlay={() => handlePlay(track, playlist)}
          />
        ))
      ) : (
        <p>No tracks available</p>
      )}
    </div>
  );
};

export default Playlist;