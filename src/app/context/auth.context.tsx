import { observer } from 'mobx-react-lite';
import { createContext, ReactNode, useEffect } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../const/routes.const.ts';
import { useStore } from '../hooks/useStore.hook.ts';
import { AuthStore } from '../models/auth/auth.store.ts';

export const AuthContext = createContext<AuthStore | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = observer(({ children }: AuthProviderProps) => {
  const { authStore } = useStore();

  const navigate = useNavigate();
  const location = useLocation();
  const isRootPath = useMatch('/');

  useEffect(() => {
    isRootPath && navigate(RoutePaths.MAIN);

    if (authStore.isAuthenticated) {
      location.pathname.includes(RoutePaths.AUTH) && navigate(RoutePaths.MAIN);
      return;
    } else {
      location.pathname.includes(RoutePaths.MAIN) && navigate(RoutePaths.AUTH);
      return;
    }
  }, [authStore.isAuthenticated, isRootPath, location.pathname, navigate]);

  return <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>;
});
export default AuthProvider;
