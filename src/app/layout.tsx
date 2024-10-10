import React from 'react';
import type { Metadata } from "next";
import Navigation from '@/components/Navigation/Navigation';
import "./globals_old.css";

export const metadata: Metadata = {
  title: 'Skypro Music',
  description: 'Music streaming service',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <div className="wrapper">
          <div className="container">
            <main className="main">
              <Navigation />
              {children}
            </main>
            {/* <Bar /> */}
          </div>
        </div>
      </body>
    </html>
  );
}