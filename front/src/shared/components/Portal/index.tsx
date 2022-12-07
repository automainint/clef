import { FC, PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal: FC<PropsWithChildren> = ({ children }) => {
  const [container] = useState(() => (typeof window === 'object' ? document.createElement('div') : null));

  useEffect(() => {
    if (container === null) return;
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return container !== null ? ReactDOM.createPortal(children, container) : null;
};

export { Portal };
