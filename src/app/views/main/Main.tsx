import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useMatch } from 'react-router-dom';
import { RoutePaths } from '../../const/routes.const.ts';
import { useStore } from '../../hooks/useStore.hook.ts';
import { AppLogo } from '../shared/AppLogo.tsx';
import { Loader } from '../shared/Loader.tsx';
import { SidebarFolders } from './components/SidebarFolders.tsx';
import { SidebarNav } from './components/SidebarNav.tsx';
import { SidebarTypes } from './components/SidebarTypes.tsx';

export const Main = observer(() => {
  const { accountStore, loginStore } = useStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([accountStore.load(), loginStore.load()]).then(() => setLoading(false));
  }, []);

  if (useMatch(RoutePaths.MAIN)) {
    return <Navigate to={RoutePaths.LOGIN} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="main">
      <div className="main-sidebar">
        <div className="main-sidebar-logo">
          <AppLogo />
        </div>

        <div className="main-sidebar-nav">
          <SidebarNav />
        </div>

        <div className="main-sidebar-types">
          <h4>Types</h4>
          <SidebarTypes />
        </div>

        <div className="main-sidebar-folders">
          <h4>Folders</h4>
          <SidebarFolders />
        </div>

        <div className="main-sidebar-action">
          <Button type="primary" icon={<i className="icon icon-plus" />} block>
            Add Folder
          </Button>
        </div>
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
});
