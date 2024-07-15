import { Navigate, Outlet, useMatch } from 'react-router-dom';
import { RoutePaths } from '../../const/routes.const.ts';

export const Auth = () => {
  if (useMatch(RoutePaths.AUTH)) {
    return <Navigate to={RoutePaths.AUTH_SIGN_IN} />;
  }

  return <Outlet />;
};
