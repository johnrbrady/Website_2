import React, { useState, useEffect, useRef } from 'react';

interface Photo {
  id: number;
  src: string;
  alt: string;
}

const photos: Photo[] = [
  { id: 1, src: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Family enjoying outdoor picnic together' },
  { id: 2, src: 'https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Children playing in the backyard' },
  { id: 3, src: 'https://images.pexels.com/photos/1183986/pexels-photo-1183986.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Family cooking together in kitchen' },
  { id: 4, src: 'https://images.pexels.com/photos/1146603/pexels-photo-1146603.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Weekend family hiking adventure' },
  { id: 5, src: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Beach vacation memories' },
  { id: 6, src: 'https://images.pexels.com/photos/1620653/pexels-photo-1620653.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Birthday celebration at home' },
  { id: 7, src: 'https://images.pexels.com/photos/1648374/pexels-photo-1648374.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Family game night fun' },
  { id: 8, src: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Holiday traditions and memories' },
  { id: 9, src: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Summer backyard barbecue' },
  { id: 10, src: 'https://images.pexels.com/photos/1204475/pexels-photo-1204475.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Family reading time together' },
  { id: 11, src: 'https://images.pexels.com/photos/1128317/pexels-photo-1128317.jpeg?auto=compress&cs=tinysrgb&w=400', alt: 'Pet adventures with the family' },
  { id: 12, src: '/photo12.jpg', alt: 'Family memory 12' },
  { id: 13, src: '/photo13.jpg', alt: 'Family memory 13' },
  { id: 14, src: '/photo14.jpg', alt: 'Family memory 14' },
  { id: 15, src: '/photo15.jpg', alt: 'Family memory 15' },
  { id: 16, src: '/photo16.jpg', alt: 'Family memory 16' },
  { id: 17, src: '/photo17.jpg', alt: 'Family memory 17' },
  { id: 18, src: '/photo18.jpg', alt: 'Family memory 18' },
  { id: 19, src: '/photo19.jpg', alt: 'Family memory 19' },
  { id: 20, src: '/photo20.jpg', alt: 'Family memory 20' },
];

interface LazyImageProps {
  photo: Photo;
  className: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ photo, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

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

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {inView && (
        <img
          src={photo.src}
          alt={photo.alt}
          className={`w-full h-full object-cover transition-opacity duration-200 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};

export const PhotoGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 z-10">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-1 sm:gap-2 p-4 sm:p-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square overflow-hidden rounded-lg opacity-0 md:opacity-0 md:hover:opacity-80 
                     opacity-80 transition-opacity duration-200 ease-in-out
                     transform hover:scale-105 hover:shadow-lg"
            style={{ 
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <LazyImage 
              photo={photo} 
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};