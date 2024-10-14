"use client";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useParams, usePathname } from 'next/navigation';
import Track from '@/components/Track/Track';
import styles from './Playlist.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import PlaylistTitle from '../PlaylistTitle/PlaylistTitle';
import { Track as TrackType } from '@/hooks/useFetchTracks';
import { getSelectionById } from '@/api/api';
import Skeleton from '../Skeleton/Skeleton';

interface PlaylistProps {
  customTracks?: TrackType[];
}

const Playlist: React.FC = () => {
  const { handlePlay } = useAudioPlayer();
  const { isPlaying, currentTrack, playlist, favoriteTracks, isLoading } = useSelector((state: RootState) => state.audioPlayer);
  const pathname = usePathname();
  const [displayedTracks, setDisplayedTracks] = useState<TrackType[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchTracks = async () => {
      let tracks: TrackType[] = [];
      switch (true) {
        case pathname === '/my-playlist':
          tracks = playlist.filter(track => favoriteTracks.includes(track._id));
          break;
        case pathname.startsWith('/playlist/'):
          const playlistId = params.id as string;
          const data = await getSelectionById(Number(playlistId));
          const selectionTracks = data.data.items;
          tracks = playlist.filter(track => selectionTracks.includes(track._id));
          break;
        default:
          tracks = playlist;
      }

      setDisplayedTracks(tracks);
    };

    fetchTracks();
  }, [pathname, params, playlist, favoriteTracks]);

  if (isLoading) {
    return (
      <div className={styles.playlist}>
        <PlaylistTitle />
        <Skeleton type="playlist" count={5} />
      </div>
    );
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
          onPlay={() => handlePlay(track, displayedTracks)}
        />
      ))}
    </div>
  );
};

export default Playlist;