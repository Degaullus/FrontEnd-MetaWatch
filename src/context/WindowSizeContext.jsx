import { createContext, useContext } from 'react';

import useWindowSize from '../hooks/useWindowSize';

const WindowSizeContext = createContext({ width: undefined, height: undefined });

export const WindowSizeProvider = ({ children }) => {

  const size = useWindowSize();

  return (
    <WindowSizeContext.Provider value={size}>
      {children}
    </WindowSizeContext.Provider>
  );
}

export const useWindowSizeContext = () => useContext(WindowSizeContext);