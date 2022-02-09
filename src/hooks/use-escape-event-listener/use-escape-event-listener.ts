import {useEffect} from 'react';
import {ESCAPE} from '../../const/const';

function useEscapeEventListener(onClose: () => void) {
  const onKeyDown = ({key}:KeyboardEvent) => {
    if (key === ESCAPE) {
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
