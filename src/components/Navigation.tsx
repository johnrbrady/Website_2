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
<<<<<<< HEAD
        <NavButton href="http://192.168.0.64:30013/web/index.html#/home.html">HomeFlix</NavButton>
        <NavButton href="http://192.168.0.64:30027/apps/files/files">HomeDrive</NavButton>
        <NavButton href="http://192.168.0.64:30042/">HomeRequest</NavButton>
=======
        <NavButton href="http://192.168.0.64:30013/web/index.html#/home.html">
          HomeFlix
        </NavButton>
        <NavButton href="http://192.168.0.64:30027/apps/files/files">
          HomeDrive
        </NavButton>
        <NavButton href="http://192.168.0.64:30042/">
          HomeRequest
        </NavButton>
>>>>>>> 7ad0b0e (Deploy: staggered 2-tile idle reveal + hover, image filenames fixed)
      </div>
    </nav>
  );
};
