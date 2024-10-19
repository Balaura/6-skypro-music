"use client";

import React from 'react';
import Centerblock from '@/components/Centerblock/Centerblock';
import useFetchTracks from '@/hooks/useFetchTracks';

export default function Home() {
  
  const { error } = useFetchTracks();
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Centerblock title="Треки" />
    </>
  );
}