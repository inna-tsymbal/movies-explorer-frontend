import React from 'react';
import { SCREEN_M, SCREEN_L } from './constants';

export const useResize = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };

    function timeOut(func, time) {
      let timer;
      return function(event){
        if (timer) {clearTimeout(timer)};
        timer = setTimeout(func, time, event);
      };
    };


    window.addEventListener('resize', timeOut(handleResize, 1000));
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isScreenS: width < SCREEN_M,
    isScreenM: width >= SCREEN_M,
    isScreenL: width >= SCREEN_L,
  };
};