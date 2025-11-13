import React from 'react';

interface NavButtonProps {
  children: React.ReactNode;
  href: string;
}

const NavButton: React.FC<NavButtonProps> = ({ children, href }) => {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center px-6 py-3 min-w-[44px] min-h-[44px]
                 bg-white/90 backdrop-blur-sm text-gray-800 font-medium rounded-xl
                 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out
                 hover:scale-105 hover:bg-white focus:outline-none focus:ring-4 
                 focus:ring-white/50 focus:scale-105 active:scale-95"
      tabIndex={0}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export const Navigation: React.FC = () => {
  return (
    <nav
      className="fixed top-4 sm:top-6 right-4 sm:right-6 z-30"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

        <NavButton href="http://100.121.23.121:7180/household">
          Shopping List
        </NavButton>

        <NavButton href="http://100.121.23.121:8096/web/index.html#/home.html">
          HomeFlix
        </NavButton>

        <NavButton href="https://truenas-scale.ewe-mine.ts.net/apps/files/personal/673?dir=/Documents/Family%20Share%20Folder">
          HomeCloud
        </NavButton>

        <NavButton href="http://100.121.23.121:5055/">
          Jellyseer
        </NavButton>

        {/* ⭐ New button here */}
        <NavButton href="http://100.121.23.121:3105/">
          Uptime Kuma
        </NavButton>

      </div>
    </nav>
  );
};
