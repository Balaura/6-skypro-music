"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Centerblock from '@/components/Centerblock/Centerblock';
import useFetchTracks from '@/hooks/useFetchTracks';

export default function Home() {
  
  const { error } = useFetchTracks();
  const isLoading = useSelector((state: RootState) => state.audioPlayer.isLoading);
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Centerblock title="Треки" />
    </>
  );
}