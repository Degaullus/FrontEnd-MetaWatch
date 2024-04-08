import { useState, useEffect } from 'react';

const isSSR = typeof window === 'undefined';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    device: isSSR ? undefined : window.innerWidth,
    width: isSSR ? undefined : window.innerWidth,
    height: isSSR ? undefined : window.innerHeight,
  });


  useEffect(() => {



    if (isSSR) return;

    const handleResize = () => {
      setWindowSize({
        device: window.innerWidth < 1024 ? 'mobile' : 'desktop',
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (windowSize);
}

export default useWindowSize;