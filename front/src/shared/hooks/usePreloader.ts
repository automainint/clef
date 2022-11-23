import { useCallback, useState } from 'react';

import { SetLoadingStatus } from 'shared/types';
import { useIsMounted } from './useIsMounted';

function usePreloader<TError = string>(
  initialError: TError,
  initialIsPending = false
): {
  isMounted: React.MutableRefObject<boolean>;
  isPending: boolean;
  error: TError;
  setLoadingStatus: SetLoadingStatus<TError>;
} {
  const isMounted = useIsMounted();
  const [{ isPending, error }, setLoadingStatus] = useState<{ isPending: boolean; error: TError }>({
    isPending: initialIsPending,
    error: initialError,
  });
  const checkAndSetLoadingStatus: SetLoadingStatus<TError> = useCallback(
    (value) => {
      if (isMounted.current) setLoadingStatus(value);
    },
    [isMounted]
  );
  return {
    isMounted,
    isPending,
    error,
    setLoadingStatus: checkAndSetLoadingStatus,
  };
}

export { usePreloader };
