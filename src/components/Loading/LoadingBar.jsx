import { useEffect, useState } from 'react';

import { useLoading } from '../../context/LoadingContext.jsx'
import style from './Loading.module.css'

const LoadingBar = () => {
  const { isLoading, setIsLoading } = useLoading();
  const [width, setWidth] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (isLoading) {
      setWidth(0);
      setOpacity(1);
      setIsLoading(true);

      const interval = setInterval(() => {
        setWidth((prevWidth) => {
          if (prevWidth >= 100) {
            clearInterval(interval);
            setTimeout(() => setOpacity(0), 700);
            setTimeout(() => setWidth(0), 600);
          }
          return prevWidth + 10;
        });
    }, 50);
  } else {
    const timeout = setTimeout(() => setWidth(0), 500);
    return () => clearTimeout(timeout);
  }
  }, [isLoading]);

  if (width <= 0) return null;

  return (
    <div 
      className={style.loadingBar}  
      style={{width: `${width}%`, opacity: opacity}}>
        <h1 className={style.heading}>{width}%</h1>
    </div>
);
}

export default LoadingBar;