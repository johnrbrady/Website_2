import React, { useState, useEffect, useRef } from 'react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  link?: string; // optional per-photo link (easter egg etc.)
}

// NOTE: Make sure each filename below EXACTLY matches what is in /public/images
const photos: Photo[] = [
  { id: 1,  src: '/images/website__1a.jpg',  alt: 'Family memory 1' },
  { id: 2,  src: '/images/website__2b.jpg',  alt: 'Family memory 2' },
  { id: 3,  src: '/images/website__3.jpg',  alt: 'Family memory 3' },
  { id: 4,  src: '/images/website__4.jpg',  alt: 'Family memory 4' },
  { id: 5,  src: '/images/website__5b.jpg',  alt: 'Family memory 5' },
  { id: 6,  src: '/images/website__6.jpg',  alt: 'Family memory 6' },
  { id: 7,  src: '/images/website__7.jpg',  alt: 'Family memory 7' },
  { id: 8,  src: '/images/website__8.jpg',  alt: 'Family memory 8' },
  // Easter egg on #9:
  { id: 9,  src: '/images/website__9.jpg',  alt: 'Family memory 9', link: 'https://www.youtube.com/watch?v=81U1IyqQqD4' },
  { id: 10, src: '/images/website__10.jpg', alt: 'Family memory 10' },
  { id: 11, src: '/images/website__11b.jpg', alt: 'Family memory 11' },
  { id: 12, src: '/images/website__12.jpg', alt: 'Family memory 12' },
  { id: 13, src: '/images/website__13.jpg', alt: 'Family memory 13' },
  { id: 14, src: '/images/website__14.jpg', alt: 'Family memory 14' },
  { id: 15, src: '/images/website__15.jpg', alt: 'Family memory 15' },
  { id: 16, src: '/images/website__16.jpg', alt: 'Family memory 16' },
  { id: 17, src: '/images/website__17.jpg', alt: 'Family memory 17' },
  { id: 18, src: '/images/website__18.jpg', alt: 'Family memory 18' },
  { id: 19, src: '/images/website__19.jpg', alt: 'Family memory 19' },
  { id: 20, src: '/images/website__20.jpg', alt: 'Family memory 20' },
];

interface LazyImageProps {
  photo: Photo;
  className: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ photo, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={className}>
      {inView && (
        <img
          src={photo.src}
          alt={photo.alt}
          className={`w-full h-full object-cover transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};

// ✅ Named export so App.tsx can `import { PhotoGrid } from './components/PhotoGrid'`
export const PhotoGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 z-10">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-1 sm:gap-2 p-4 sm:p-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square overflow-hidden rounded-lg opacity-0 hover:opacity-90 transition-opacity duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
            style={{ animationDelay: `${Math.random() * 2}s` }}
          >
            {photo.link ? (
              <a
                href={photo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full cursor-pointer"
                aria-label={`Open link for ${photo.alt}`}
              >
                <LazyImage photo={photo} className="w-full h-full" />
              </a>
            ) : (
              <LazyImage photo={photo} className="w-full h-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

