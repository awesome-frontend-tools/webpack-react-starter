import { createWebpackAliases } from './webpack.helpers';

export const buildAliases = () =>
  createWebpackAliases({
    assets: 'src/assets/',
  });
