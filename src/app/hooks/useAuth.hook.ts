import { useContext } from 'react';
import { AuthContext } from '../context/auth.context.tsx';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('You have forgotten to wrap your root component with AuthProvider');
  }
  return context;
};
