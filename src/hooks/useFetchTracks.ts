import { useState, useEffect } from 'react';

export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number; // в секундах
  release_date: string;
}

const useFetchTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/');
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Треки не найдены');
          } else if (response.status >= 500) {
            throw new Error('Ошибка сервера. Пожалуйста, попробуйте позже');
          } else {
            throw new Error('Не удалось загрузить треки');
          }
        }
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setTracks(data.data.map((track: any) => ({
            id: track._id || 0,
            title: track.name || '',
            artist: track.author || '',
            album: track.album || '',
            genre: track.genre || '',
            duration: track.duration_in_seconds || 0,
            release_date: track.release_date || '',
          })));
        } else {
          throw new Error('Неверный формат данных');
        }
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === 'Failed to fetch') {
            setError('Проблема с сетевым подключением. Пожалуйста, проверьте ваше интернет-соединение');
          } else {
            setError(err.message);
          }
        } else {
          setError('Произошла неизвестная ошибка');
        }
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