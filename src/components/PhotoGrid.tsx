import React, { useEffect, useMemo, useRef, useState } from 'react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  link?: string;
}

const photos: Photo[] = [
  { id: 1,  src: '/images/website__1a.jpg',  alt: 'Family photo 1' },
  { id: 2,  src: '/images/website__2b.jpg',  alt: 'Family photo 2' },
  { id: 3,  src: '/images/website__3.jpg',   alt: 'Family photo 3' },
  { id: 4,  src: '/images/website__4.jpg',   alt: 'Family photo 4' },
  { id: 5,  src: '/images/website__5b.jpg',  alt: 'Family photo 5' },
  { id: 6,  src: '/images/website__6.jpg',   alt: 'Family photo 6' },
  { id: 7,  src: '/images/website__7.jpg',   alt: 'Family photo 7' },
  { id: 8,  src: '/images/website__8.jpg',   alt: 'Family photo 8' },
  { id: 9,  src: '/images/website__9.jpg',   alt: 'Family photo 9', link: 'https://www.youtube.com/watch?v=81U1IyqQqD4' },
  { id: 10, src: '/images/website__10.jpg',  alt: 'Family photo 10' },
  { id: 11, src: '/images/website__11b.jpg', alt: 'Family photo 11' },
  { id: 12, src: '/images/website__12.jpg',  alt: 'Family photo 12' },
  { id: 13, src: '/images/website__13.jpg',  alt: 'Family photo 13' },
  { id: 14, src: '/images/website__14.jpg',  alt: 'Family photo 14' },
  { id: 15, src: '/images/website__15.jpg',  alt: 'Family photo 15' },
  { id: 16, src: '/images/website__16.jpg',  alt: 'Family photo 16' },
  { id: 17, src: '/images/website__17.jpg',  alt: 'Family photo 17' },
  { id: 18, src: '/images/website__18.jpg',  alt: 'Family photo 18' },
  { id: 19, src: '/images/website__19.jpg',  alt: 'Family photo 19' },
  { id: 20, src: '/images/website__20.jpg',  alt: 'Family photo 20' }
];

// ---- settings ----
const IDLE_MS = 5000;  // start screensaver after 5s idle
const CYCLE_MS = 6000; // each slot changes every 6s (staggered 3s apart)

export const PhotoGrid: React.FC = () => {
  // two independent “slots” -> total visible = 2
  const [activeA, setActiveA] = useState<number | null>(null);
  const [activeB, setActiveB] = useState<number | null>(null);

  const lastMoveRef = useRef<number>(Date.now());
  const idleRef = useRef<boolean>(false);

  // activity watcher: any mouse/key cancels idle and clears highlights
  useEffect(() => {
    const onMove = () => {
      lastMoveRef.current = Date.now();
      if (idleRef.current) {
        idleRef.current = false;
        setActiveA(null);
        setActiveB(null);
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('keydown', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('keydown', onMove);
    };
  }, []);

  // pick a random photo id, excluding anything in `exclude`
  const pickRandom = (exclude: Set<number>) => {
    const candidates = photos.map(p => p.id).filter(id => !exclude.has(id));
    if (candidates.length === 0) return null;
    const r = Math.floor(Math.random() * candidates.length);
    return candidates[r];
  };

  // two staggered timers: slot A ticks every 6s; slot B starts 3s later and also ticks every 6s
  useEffect(() => {
    const startSlot = (setter: (n: number | null) => void, otherGetter: () => number | null) => {
      const tick = () => {
        const idle = Date.now() - lastMoveRef.current > IDLE_MS;
        if (!idle) return;
        idleRef.current = true;

        const exclude = new Set<number>();
        const other = otherGetter();
        if (other != null) exclude.add(other);

        const next = pickRandom(exclude);
        if (next != null) setter(next);
      };

      // fire once immediately when entering idle, then on interval
      const idleCheck = setInterval(() => {
        if (Date.now() - lastMoveRef.current > IDLE_MS && !idleRef.current) {
          idleRef.current = true;
          tick();
        }
      }, 500);

      const interval = setInterval(() => {
        if (idleRef.current) tick();
      }, CYCLE_MS);

      return () => {
        clearInterval(idleCheck);
        clearInterval(interval);
      };
    };

    // slot A starts now
    const cleanupA = startSlot(setActiveA, () => activeB);

    // slot B starts after half-cycle (3s) -> staggered
    const startBTimeout = setTimeout(() => {
      const cleanupB = startSlot(setActiveB, () => activeA);
      // attach to window for cleanup chaining
      (window as any).__cleanupB = cleanupB;
    }, CYCLE_MS / 2);

    return () => {
      cleanupA();
      clearTimeout(startBTimeout);
      if ((window as any).__cleanupB) {
        (window as any).__cleanupB();
        delete (window as any).__cleanupB;
      }
    };
  }, [activeA, activeB]); // keep refs fresh (safe here; timers are cleared/recreated)

  const highlighted = useMemo(() => {
    const ids = new Set<number>();
    if (activeA != null) ids.add(activeA);
    if (activeB != null) ids.add(activeB);
    return ids;
  }, [activeA, activeB]);

  const baseTile =
    'group aspect-square overflow-hidden rounded-lg transition-all duration-500 ease-in-out ' +
    'transform hover:scale-105 hover:shadow-lg';

  return (
    <div className="absolute inset-0 z-10">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-1 sm:gap-2 p-4 sm:p-6">
        {photos.map((photo) => {
          const isHighlighted = highlighted.has(photo.id);
          // invisible by default; reveal to 95% on hover OR if highlighted by screensaver
          const opacityClass = isHighlighted ? 'opacity-95' : 'opacity-0 group-hover:opacity-95';

          const imgEl = (
            <img
              src={photo.src}
              alt={photo.alt}
              className={`w-full h-full object-cover transition-opacity duration-500 ${opacityClass}`}
              loading="lazy"
            />
          );

          return (
            <div key={photo.id} className={baseTile}>
              {photo.link ? (
                <a
                  href={photo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                  aria-label={`Open link for ${photo.alt}`}
                >
                  {imgEl}
                </a>
              ) : (
                imgEl
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

