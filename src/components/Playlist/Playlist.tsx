import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useParams, usePathname } from 'next/navigation';
import Track from '@/components/Track/Track';
import styles from './Playlist.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import PlaylistTitle from '../PlaylistTitle/PlaylistTitle';
import { Track as TrackType } from '@/hooks/useFetchTracks';
import { getSelectionById } from '@/api/api';
import Skeleton from '../Skeleton/Skeleton';
import { setIsLoading, setPlaylist, setCurrentPlaylist } from '@/store/features/audioPlayerSlice';

// Виртуализацию списка с react-window
// import { FixedSizeList as List } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';

const Playlist: React.FC = () => {
  const { handlePlay } = useAudioPlayer();
  const {
    isPlaying,
    currentTrack,
    playlist,
    currentPlaylist,
    favoriteTracks,
    isLoading,
    searchKeyword,
    selectedArtists,
    selectedGenres,
    selectedYear,
    sortOption
  } = useSelector((state: RootState) => state.audioPlayer);
  const pathname = usePathname();
  const params = useParams();
  const dispatch = useDispatch();
  // const [displayedTracks, setDisplayedTracks] = useState<TrackType[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      dispatch(setIsLoading(true));
      try {
        let tracks: TrackType[] = [];
        if (pathname === '/my-playlist') {
          tracks = playlist.filter(track => favoriteTracks.includes(track._id));
        } else if (pathname.startsWith('/playlist/')) {
          const playlistId = params.id as string;
          const data = await getSelectionById(Number(playlistId));
          const selectionTracks = data.data.items;
          tracks = playlist.filter(track => selectionTracks.includes(track._id));
        } else {
          tracks = playlist;
        }
        dispatch(setCurrentPlaylist(tracks));
        // setDisplayedTracks(tracks);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchTracks();
  }, [pathname, params, playlist, favoriteTracks, dispatch]);

  const filteredAndSortedTracks = useMemo(() => {
    return currentPlaylist
      .filter((track): track is TrackType => track !== undefined && track !== null)
      .filter(track => {
        const keywordMatch = (track.name.toLowerCase().includes(searchKeyword.toLowerCase())) ||
          (track.author.toLowerCase().includes(searchKeyword.toLowerCase()));
        const artistMatch = selectedArtists.length === 0 || selectedArtists.includes(track.author);
        const genreMatch = selectedGenres.length === 0 || (
          Array.isArray(track.genre)
            ? track.genre.some(g => selectedGenres.includes(g))
            : selectedGenres.includes(track.genre)
        );
        const yearMatch = !selectedYear || (new Date(track.release_date).getFullYear().toString() === selectedYear);
        return keywordMatch && artistMatch && genreMatch && yearMatch;
      })
      .sort((a, b) => {
        if (sortOption === 'new') {
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        } else if (sortOption === 'old') {
          return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
        }
        return 0;
      });
  }, [currentPlaylist, searchKeyword, selectedArtists, selectedGenres, selectedYear, sortOption]);

  // Для проведения базового аудита
  // useEffect(() => {
  //   if (process.env.NODE_ENV === 'development') {
  //     console.time('Playlist render');
  //     return () => {
  //       console.timeEnd('Playlist render');
  //     };
  //   }
  // }, [filteredAndSortedTracks]);

  if (isLoading) {
    return (
      <div className={styles.playlist}>
        <PlaylistTitle />
        <Skeleton type="playlist" count={5} />
      </div>
    );
  }

  // // Виртуализацию списка с react-window
  // const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
  //   const track = filteredAndSortedTracks[index];
  //   return (
  //     <div style={style}>
  //       <Track
  //         key={track._id}
  //         {...track}
  //         isPlaying={isPlaying && currentTrack?._id === track._id}
  //         isCurrentTrack={currentTrack?._id === track._id}
  //         onPlay={() => handlePlay(track, filteredAndSortedTracks)}
  //       />
  //     </div>
  //   );
  // };

  return (
    <div className={styles.playlist}>
      <PlaylistTitle />
      {filteredAndSortedTracks.length === 0 ? (
        <p className={styles.noResults}>Треки не найдены</p>
      ) : (
        filteredAndSortedTracks.map((track) => (
          <Track
            key={track._id}
            {...track}
            isPlaying={isPlaying && currentTrack?._id === track._id}
            isCurrentTrack={currentTrack?._id === track._id}
            onPlay={() => handlePlay(track, filteredAndSortedTracks)}
          />
        ))
      )}
    </div>
  );
};

// Виртуализацию списка с react-window

// return (
//   <div className={styles.playlist}>
//     <PlaylistTitle />
//     {filteredAndSortedTracks.length === 0 ? (
//       <p className={styles.noResults}>Треки не найдены</p>
//     ) : (
//       <AutoSizer>
//         {({ height, width }) => (
//           <List
//             height={height}
//             itemCount={filteredAndSortedTracks.length}
//             itemSize={60} // Примерная высота одного трека
//             width={width}
//           >
//             {Row}
//           </List>
//         )}
//       </AutoSizer>
//     )}
//   </div>
// );
// };


export default Playlist;