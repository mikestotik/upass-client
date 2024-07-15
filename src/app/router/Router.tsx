import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import { MainRoutes } from './Main.routes.tsx';
import { AuthRoutes } from './Auth.routes.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [AuthRoutes, MainRoutes],
  },
]);
