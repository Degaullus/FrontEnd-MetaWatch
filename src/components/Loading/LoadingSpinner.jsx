// import { useEffect } from 'react';
// import { useLoading } from '../context/LoadingContext';
// import LoadingSpinner from '../components/Loading/LoadingSpinner';

// function DataFetchingComponent() {
//   const { setIsLoading } = useLoading();
//   const [data, setData] = React.useState(null);

//   const fetchData = async () => {
//     setIsLoading(true); // Start loading
//     try {
//       const response = await fetch('YOUR_BACKEND_ENDPOINT');
//       const jsonData = await response.json();
//       setData(jsonData); // Save the fetched data to state
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//     } finally {
//       setIsLoading(false); // Stop loading irrespective of success or failure
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []); // Empty dependency array means this effect runs once on mount

//   return (
//     <div>
//       <LoadingSpinner />
//       {/* Render your data or component based on the fetched data */}
//       {data && <div>{/* Render your data here */}</div>}
//     </div>
//   );
// }

// export default DataFetchingComponent;

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