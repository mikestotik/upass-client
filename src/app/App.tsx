import { ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';
import { themeConfig } from './config/theme.config.ts';
import AuthProvider from './context/auth.context.tsx';
import AppStoreProvider from './context/store.context.tsx';

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <AppStoreProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </AppStoreProvider>
    </ConfigProvider>
  );
}

export default App;
