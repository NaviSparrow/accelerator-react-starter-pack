import {useLayoutEffect} from 'react';

function useLockBodyScroll(): void {
  useLayoutEffect(() : () => void => {
    const originalStyle: string = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = originalStyle);
  }, []);
}

export default useLockBodyScroll;
