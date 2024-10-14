'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import styles from './page.module.css';
import useFetchTracks from '@/hooks/useFetchTracks';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  useFetchTracks();
  const pathname = usePathname();
  const isAuthPage = pathname === '/signin' || pathname === '/signup';

  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          {!isAuthPage && <Navigation />}
          {isAuthPage ? (
            children
          ) : (
            <>
              <div className={styles.mainContent}>
                {children}
                <Sidebar />
              </div>
              <Bar />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;