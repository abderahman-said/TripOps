import { useState, useEffect, useRef } from "react";

type UseInViewReturn = [React.RefObject<HTMLElement | null>, boolean];

export function useInView(threshold = 0.15): UseInViewReturn {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState<boolean>(false);
  
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold });
    
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  
  return [ref, inView];
}
