import { createContext, FC, useContext, PropsWithChildren } from 'react';
import { Store } from './Store';

const StoreContext = createContext<Store>(new Store());

const StoreProvider: FC<PropsWithChildren<{ store: Store }>> = ({ store, children }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);
const useStore: () => Store = () => useContext(StoreContext);

export { Store, StoreProvider, useStore };
