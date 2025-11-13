import React from 'react';
import { PhotoGrid } from './components/PhotoGrid';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { Dashboards } from './components/Dashboards';

function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">

      {/* Background Layer */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url("/images/Cover1.JPG")',
          filter: 'saturate(1.1) contrast(1.05) brightness(1.03)',
        }}
      />

      {/* Photo fade layer (behind dashboards) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <PhotoGrid />
      </div>

      {/* Foreground UI layer */}
      <div className="relative z-20">
        <Header />
        <Navigation />

        {/* Main content */}
        <main
          id="main-content"
          className="relative z-20 flex flex-col items-center justify-start 
                     w-full pt-32 pb-20 px-4"
        >
          {/* Dashboards centered */}
          <Dashboards />
        </main>
      </div>

      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                   bg-white px-4 py-2 rounded-lg z-50 focus:z-50"
      >
        Skip to main content
      </a>

    </div>
  );
}

export default App;
