import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30">
      <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
        <p className="text-sm text-gray-700 text-center font-medium">
          © {currentYear} Game4Life. All rights reserved.
        </p>
      </div>
    </footer>
  );
};