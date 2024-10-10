import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/');

        console.log("Полный ответ сервера:", response); // для отладки

        if (!response.ok) {
          throw new Error('Не удалось загрузить треки');
        }
        const data = await response.json();

        console.log("Данные, полученные с сервера:", data); // для отладки

        if (Array.isArray(data)) {
          
          setTracks(data);
        } else if (data.success && Array.isArray(data.data)) {
          setTracks(data.data);
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