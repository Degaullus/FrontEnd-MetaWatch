import { useEffect, useState } from 'react';

import { useLoading } from '../../context/LoadingContext.jsx'
import style from './Loading.module.css'

const LoadingBar = () => {
  const { isLoading, setIsLoading } = useLoading();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer;
    if (isLoading) {
      setShow(true);
    } else {
      timer = setTimeout(() => setShow(false), 500);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!show) return null;

  return <div className={style.loadingBar}></div>;
}

export default LoadingBar;