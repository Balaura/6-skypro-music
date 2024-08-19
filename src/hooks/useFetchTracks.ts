import { useState, useEffect } from 'react';

export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
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
          throw new Error('Не удалось загрузить треки');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setTracks(data.map((track: any) => ({
            id: track.id || 0,
            title: track.title || '',
            artist: track.artist || '',
            album: track.album || '',
            genre: track.genre || '',
            release_date: track.release_date || '',
          })));
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