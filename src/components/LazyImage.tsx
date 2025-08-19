import React, { useEffect, useRef, useState } from 'react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  link?: string;
}

interface LazyImageProps {
  photo: Photo;
  className: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ photo, className }) => {
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

return (
  <div className={className}>
    <img
      src={photo.src}
      alt={photo.alt}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
);
};
