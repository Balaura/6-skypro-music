"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Centerblock from '@/components/Centerblock/Centerblock';
import useFetchTracks from '@/hooks/useFetchTracks';
import { useRouter } from 'next/navigation';

export default function MyPlaylist() {
  const username = useSelector((state: RootState) => state.auth.username);
  const { error } = useFetchTracks();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push('/signin');
    }
  }, [username, router]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!username) {
    return null;
  }

  return (
    <>
      <Centerblock title="Избранное" />
    </>
  );
}