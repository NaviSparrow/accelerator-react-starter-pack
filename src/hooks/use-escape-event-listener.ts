import {useEffect} from 'react';

function useEscapeEventListener(onClose: () => void) {
  const onKeyDown = ({key}:KeyboardEvent) => {
    if (key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });
}

export default useEscapeEventListener;
