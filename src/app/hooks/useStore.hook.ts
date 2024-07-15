import { useContext } from 'react';
import { AppStoreContext } from '../context/store.context.tsx';

export const useStore = () => {
  const context = useContext(AppStoreContext);
  if (context === null) {
    throw new Error('You have forgotten to wrap your root component with AppStoreProvider');
  }
  return context;
};
