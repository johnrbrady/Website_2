import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 p-4 z-50">
      <img
        src="/images/Logo.png"
        alt="Game4Life Logo"
        className="h-32 w-auto drop-shadow-lg"
      />
    </header>
  );
};

