"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { usePathname } from 'next/navigation';
import Track from '@/components/Track/Track';
import styles from './Playlist.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import PlaylistTitle from '../PlaylistTitle/PlaylistTitle';

const Playlist: React.FC = () => {
  const { handlePlay } = useAudioPlayer();
  const { isPlaying, currentTrack, playlist, favoriteTracks, isLoading } = useSelector((state: RootState) => state.audioPlayer);
  const pathname = usePathname();

  const displayedTracks = pathname === '/my-playlist'
    ? playlist.filter(track => favoriteTracks.includes(track._id))
    : playlist;

  if (isLoading) {
    return <p>Loading tracks...</p>;
  }

  if (displayedTracks.length === 0) {
    return <p>No tracks available</p>;
  }

  return (
    <div className={styles.playlist}>
      <PlaylistTitle />
      {displayedTracks.map((track) => (
        <Track
          key={track._id}
          {...track}
          isPlaying={isPlaying}
          isCurrentTrack={currentTrack?._id === track._id}
          onPlay={() => handlePlay(track, playlist)}
        />
      ))}
    </div>
  );
};

export default Playlist;