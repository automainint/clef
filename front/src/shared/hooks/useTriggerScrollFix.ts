import { DependencyList, useEffect } from 'react';

export function useTriggerScrollFix(deps: DependencyList) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scroll'));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
