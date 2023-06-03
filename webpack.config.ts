import path from 'path';
import webpack from 'webpack';

import { buildWebpackConfig } from './config/webpack/buildWebpackConfig';
import type { Env, Paths } from './config/webpack/types/config';

export default (env: Env) => {
  const mode = env?.mode || 'development';
  const PORT = env?.port || 3000;
  const addons = env?.addons || false;
  const isDev = mode === 'development';

  const paths: Paths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
  };

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    addons,
    port: PORT,
  });

  return config;
};
