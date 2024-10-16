'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '@/store/features/authSlice';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    dispatch(initializeAuth());
    setIsClient(true);
  }, [dispatch]);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};

export default ClientLayout;