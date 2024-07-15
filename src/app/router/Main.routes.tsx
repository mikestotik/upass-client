import React from 'react';
import { RouteObject } from 'react-router';
import { RoutePaths } from '../const/routes.const.ts';
import { LoginPage } from '../views/login/LoginPage.tsx';
import { LoginDetails } from '../views/login/LoginDetails.tsx';
import { Main } from '../views/main/Main.tsx';

export const MainRoutes: RouteObject = {
  path: RoutePaths.MAIN,
  element: <Main />,
  children: [
    {
      path: RoutePaths.LOGIN,
      element: <LoginPage />,
      children: [
        {
          path: RoutePaths.LOGIN_DETAILS,
          element: <LoginDetails />,
        },
      ],
    },
  ],
};
