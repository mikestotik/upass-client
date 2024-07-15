import { createContext, ReactNode } from 'react';
import { AppStore } from '../models/app.store.ts';

export const AppStoreContext = createContext<AppStore | null>(null);

interface AppStoreProviderProps {
  children: ReactNode;
}

const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
  return <AppStoreContext.Provider value={new AppStore()}>{children}</AppStoreContext.Provider>;
};
export default AppStoreProvider;
