import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializePlaylist, setFavoriteTracks, setIsLoading } from '@/store/features/audioPlayerSlice';
import { getAllFavoriteTracks, getAllTracks } from '@/api/api';
export interface Track {
  artist: any;
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  album: string;
  track_file: string;
}
interface ApiResponse {
  success: boolean;
  data: Track[];
}

const useFetchTracks = () => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTracks = async () => {
      dispatch(setIsLoading(true));
      try {
        const [allTracksData, favoriteTracksData] = await Promise.all([
          getAllTracks(),
          getAllFavoriteTracks()
        ]);

        if (!allTracksData.success) {
          throw new Error('Не удалось загрузить треки');
        }

        if (Array.isArray(allTracksData.data)) {
          dispatch(initializePlaylist(allTracksData.data));
        } else {
          throw new Error('Неверный формат данных для всех треков');
        }

        console.log('favoriteTracksData', favoriteTracksData);

        if (favoriteTracksData && Array.isArray(favoriteTracksData.data)) {
          const favoriteIds = favoriteTracksData.data.map((track: { _id: number; }) => track._id);
          dispatch(setFavoriteTracks(favoriteIds));
        }

        setError(null);
      } catch (err) {
        setError('Произошла ошибка при загрузке треков');
        console.error('Ошибка при загрузке треков:', err);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchTracks();
  }, [dispatch]);

  return { error };
};

export default useFetchTracks;