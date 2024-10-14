"use client";

import React from 'react';
import Centerblock from '@/components/Centerblock/Centerblock';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import styles from './page.module.css';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import useFetchTracks from '@/hooks/useFetchTracks';


export default function Home() {
  const { tracks, error, loading } = useFetchTracks();

  return (
    <>
      <div className={styles.mainContent}>
        <Centerblock tracks={tracks} error={error} loading={loading}  />
        <Sidebar />
      </div>
      <Bar />
    </>
  );
}