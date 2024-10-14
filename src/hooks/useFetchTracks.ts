import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializePlaylist } from '@/store/features/audioPlayerSlice';

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
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/');

        if (!response.ok) {
          throw new Error('Не удалось загрузить треки');
        }
        const data = await response.json();

        if (Array.isArray(data)) {

          setTracks(data);
          dispatch(initializePlaylist(data));
        } else if (data.success && Array.isArray(data.data)) {
          setTracks(data.data);
          dispatch(initializePlaylist(data.data));
        } else {
          throw new Error('Неверный формат данных');
        }
        setError(null);
      } catch (err) {
        setError('Произошла ошибка при загрузке треков');
        console.error('Ошибка при загрузке треков:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return { tracks, error, loading };
};

export default useFetchTracks;