"use client";

import React from 'react';
import Track from '@/components/Track/Track';
import styles from './Playlist.module.css';
import { Track as TrackType } from '@/hooks/useFetchTracks';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface PlaylistProps {
  tracks: TrackType[];
}

const Playlist: React.FC<PlaylistProps> = ({ tracks }) => {

  const { isPlaying, currentTrack, handlePlay } = useAudioPlayer();

  console.log('Rendering Playlist with tracks:', tracks);

  const uniqueIds = new Set(tracks.map(track => track.id));

  if (uniqueIds.size !== tracks.length) {
    console.error('WARNING: Duplicate track ids detected!');
  }

  return (
    <div className={styles.playlist}>
      {tracks && tracks.length > 0 ? (
        tracks.map((track) => (
          console.log('Rendering track:', track),
          <Track 
            key={track.id} 
            {...track} 
            isPlaying={isPlaying && currentTrack?.id === track.id}
            onPlay={() => handlePlay(track)}
          />
        ))
      ) : (
        <p>No tracks available</p>
      )}
    </div>
  );
};

export default Playlist;