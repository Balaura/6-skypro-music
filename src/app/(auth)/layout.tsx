"use client"

import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          {children}
        </main>
      </div>
    </div>
  );
}