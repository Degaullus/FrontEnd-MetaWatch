import { useState, useEffect } from 'react';

const isSSR = typeof window === 'undefined';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: isSSR ? undefined : window.innerWidth,
    height: isSSR ? undefined : window.innerHeight,
  });

  useEffect(() => {

    if (isSSR) return;
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;