import React from 'react';
import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "../store/ReduxProvider";
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Skypro Music',
  description: 'Music streaming service',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <ReduxProvider>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body suppressHydrationWarning={true}>
          <ClientLayout>
            {children}
          </ClientLayout>
        </body>
      </ReduxProvider>
    </html>
  );
};

export default RootLayout;