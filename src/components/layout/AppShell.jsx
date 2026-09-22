import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './navbar';

export default function AppShell({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col text-stone-900 font-sans">
      <Navbar />
      <main className={isHome ? "flex-1 w-full" : "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12"}>
        {children}
      </main>
    </div>
  );
}