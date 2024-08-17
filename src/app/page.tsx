import React from 'react';
import Centerblock from '@/components/Centerblock/Centerblock';
import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.mainContent}>
      <Centerblock />
      <Sidebar />
    </div>
  );
}