import { useRef, useEffect } from 'react';

function useIsMounted(): React.MutableRefObject<boolean> {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}

export { useIsMounted };
