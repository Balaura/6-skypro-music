"use client"
import React from 'react';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import styles from './page.module.css';
import useFetchTracks from '@/hooks/useFetchTracks';

export default function TracksLayout({ children }: { children: React.ReactNode }) {
  useFetchTracks();

  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Navigation />
          <div className={styles.mainContent}>
            {children}
            <Sidebar />
          </div>
          <Bar />
        </main>
      </div>
    </div>
  );
}