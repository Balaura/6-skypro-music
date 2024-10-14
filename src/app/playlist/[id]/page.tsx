"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSelectionById } from '@/api/api'; // Новый импорт
import Centerblock from '@/components/Centerblock/Centerblock';
import Playlist from '@/components/Playlist/Playlist';
import { Track } from '@/hooks/useFetchTracks';
import styles from '../../page.module.css';

// Новый интерфейс
interface Selection {
  id: number;
  name: string;
  items: Track[];
}

export default function PlaylistPage() {
  const { id } = useParams();
  // Новые состояния
  const [selection, setSelection] = useState<Selection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Новый useEffect для загрузки данных подборки
  useEffect(() => {
    const fetchSelection = async () => {
      setIsLoading(true);
      try {
        const data = await getSelectionById(Number(id));
        console.log('data', data);
        setSelection(data.data);
      } catch (err) {
        setError('Ошибка при загрузке подборки');
        console.error('Ошибка при загрузке подборки:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchSelection();
    }
  }, [id]);


  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!selection) {
    return <div>Подборка не найдена</div>;
  }

  return (
    <div className={styles.mainContent}>
      <Centerblock title={selection.name} />
    </div>
  );
}