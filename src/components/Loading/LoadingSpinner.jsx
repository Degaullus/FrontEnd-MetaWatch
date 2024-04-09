import { useContext } from 'react';
import { useLoading } from '../../context/LoadingContext';

import styles from './LoadingSpinner.module.css'; 

const LoadingSpinner = () => {
  const { isLoading } = useLoading();

  const overlayClasses = isLoading ? `${styles.overlay} ${styles.active}` : styles.overlay;

  return (
    <div className={overlayClasses}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoadingSpinner;