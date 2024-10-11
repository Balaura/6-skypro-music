"use client";

import React from 'react';
import Track from '@/components/Track/Track';
import styles from './Playlist.module.css';
import { Track as TrackType } from '@/hooks/useFetchTracks';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface PlaylistProps {
  tracks: TrackType[];
  audioPlayerState: ReturnType<typeof useAudioPlayer>;
}

const Playlist: React.FC<PlaylistProps> = ({ tracks, audioPlayerState }) => {

  const { isPlaying, currentTrack, handlePlay } = audioPlayerState;

  // console.log('Rendering Playlist with tracks:', tracks);

  const uniqueIds = new Set(tracks.map(track => track._id));

  if (uniqueIds.size !== tracks.length) {
    console.error('WARNING: Duplicate track ids detected!');
  }

  return (
    <div className={styles.playlist}>
      {tracks && tracks.length > 0 ? (
        tracks.map((track) => (
          <Track
            key={track._id}
            {...track}
            isPlaying={isPlaying && currentTrack?._id === track._id}
            onPlay={() => handlePlay(track, tracks)}
          />
        ))
      ) : (
        <p>No tracks available</p>
      )}
    </div>
  );
};

export default Playlist;