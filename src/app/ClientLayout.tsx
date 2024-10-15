'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Bar from '@/components/Bar/Bar';
import styles from './page.module.css';
import useFetchTracks from '@/hooks/useFetchTracks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '@/store/features/authSlice';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  useFetchTracks();
  const pathname = usePathname();
  const isAuthPage = pathname === '/signin' || pathname === '/signup';
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div></div>;
  }



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