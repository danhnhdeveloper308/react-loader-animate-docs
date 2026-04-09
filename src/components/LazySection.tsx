import { useEffect, useRef, useState, ReactNode } from 'react';
import { SpinLoader } from 'react-loader-animate';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}

export const LazySection = ({ children, className = '', rootMargin = '300px' }: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (
        <div className="h-64 flex items-center justify-center">
          <SpinLoader size="sm" variant="primary" />
        </div>
      )}
    </div>
  );
};
