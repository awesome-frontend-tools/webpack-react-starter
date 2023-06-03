import webpack from 'webpack';

import type { BuildOptions } from './types/config';
import { buildAliases } from './webpack.aliases';
import { buildOptimization } from './webpack.optimization';
import { buildPlugins } from './webpack.plugins';
import { buildLoaders } from './webpack.rules';
import { buildDevServer } from './webpackDevServer.config';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: isDev ? '[name].[contenthash].js' : 'static/js/[name].[contenthash:8].js',
      chunkFilename: isDev
        ? '[name].[contenthash].chunk.js'
        : 'static/js/[name].[contenthash:8].chunk.js',
      assetModuleFilename: isDev ? '[name].[hash:8].[ext]' : 'static/media/[name].[hash:8].[ext]',
      clean: true,
      publicPath: '/',
    },
    stats: 'errors-warnings',
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.png'],
      alias: buildAliases(),
    },
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    optimization: buildOptimization(),
    performance: {
      hints: false,
    },
  };
}
