import React from 'react';
import { PhotoGrid } from './components/PhotoGrid';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url("/cover-image.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-orange-800/20 to-red-900/30" />
      </div>

      {/* Photo Layer */}
      <PhotoGrid />

      {/* UI Layer */}
      <Header />
      <Navigation />
      <Footer />

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