import React from 'react';
import { PhotoGrid } from './components/PhotoGrid';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';

function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Layer */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url("/images/Cover1.JPG")',
          // optional subtle enhancement; tweak or remove if you want the pure original
          filter: 'saturate(1.1) contrast(1.05) brightness(1.03)',
        }}
      >
        {/* Optional very light overlay; comment out if you don't want ANY tint */}
        {/* <div className="absolute inset-0 bg-black/10" /> */}
      </div>

      {/* Photo Layer */}
      <PhotoGrid />

      {/* UI Layer */}
      <Header />
      <Navigation />

      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                   bg-white px-4 py-2 rounded-lg z-50 focus:z-50"
      >
        Skip to main content
      </a>

      {/* Main content wrapper for screen readers */}
      <main id="main-content" className="sr-only">
        <h2>Family Photo Gallery</h2>
        <p>Browse our collection of family memories and moments.</p>
      </main>
    </div>
  );
}

export default App;
