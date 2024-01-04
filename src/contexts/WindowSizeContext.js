import React, { createContext, useContext, useEffect, useState, useRef } from "react";

const WindowSizeContext = createContext();

export const useWindowSize = () => {
  return useContext(WindowSizeContext);
};

export const WindowSizeProvider = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1279);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 990 && window.innerWidth > 750);
  const [isMiddleSize, setIsMiddleSize] = useState(window.innerWidth <= 1279 && window.innerWidth > 990);

  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        setIsDesktop(window.innerWidth > 1279);
        setIsTablet(window.innerWidth <= 990 && window.innerWidth > 750);
        setIsMiddleSize(window.innerWidth <= 1279 && window.innerWidth > 990);
      }, 1);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WindowSizeContext.Provider value={{ isDesktop, isTablet, isMiddleSize }}>
      {children}
    </WindowSizeContext.Provider>
  );
};
