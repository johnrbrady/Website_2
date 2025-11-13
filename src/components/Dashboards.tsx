import React from 'react';

export const Dashboards: React.FC = () => {
  return (
    <div className="relative z-20 flex flex-col gap-10 w-full max-w-5xl mx-auto px-4 py-10">

      {/* Netdata */}
      <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-white/40 backdrop-blur-lg border border-white/30">
        <iframe
          src="http://100.121.23.121:2048/v3/spaces/truenas/rooms/local/overview#metrics_correlation=false&after=-900&before=0&utc=Australia%2FSydney&offset=%2B11&timezoneName=Canberra%2C%20Melbourne%2C%20Sydney"
          className="w-full h-full border-0"
          allow="fullscreen"
        />
      </div>

    </div>
  );
};
