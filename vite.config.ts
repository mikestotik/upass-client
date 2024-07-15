import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react-swc';

import { defineConfig, ProxyOptions } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

enum Mode {
  Development = 'development',
  SSL = 'ssl',
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react({ tsDecorators: true }), tsconfigPaths(), mode === Mode.SSL ? basicSsl() : null],
    server: {
      port: 5173,
      proxy: proxy(mode as Mode),
    },
  };
});

const proxy = (mode: Mode): Record<string, string | ProxyOptions> => {
  switch (mode) {
    case Mode.Development:
    case Mode.SSL:
      return {
        '/api': {
          target: 'http://127.0.0.1:3000/api',
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      };
    default:
      return {};
  }
};
