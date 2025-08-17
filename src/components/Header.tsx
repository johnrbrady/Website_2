import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-4 sm:top-6 left-4 sm:left-6 z-30">
      <div className="relative">
        <img 
          src="/logo.jpg" 
          alt="Game4Life Logo" 
          className="h-12 sm:h-16 lg:h-20 w-auto drop-shadow-2xl"
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg -z-10 
                        transform -translate-x-2 -translate-y-1 translate-x-2 translate-y-1" />
      </div>
    </header>
  );
};