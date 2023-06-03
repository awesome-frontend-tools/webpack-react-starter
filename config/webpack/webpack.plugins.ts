import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

import type { BuildOptions } from './types/config';

export function buildPlugins({
  mode,
  isDev,
  paths,
  addons,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const isProd = !isDev;

  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
      filename: 'index.html',
      favicon: paths.favicon,
    }),
    new webpack.ProgressPlugin(),
    // Использование env файлов в проекте
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(
        dotenv.config({
          path: path.join(__dirname, `../../.env.${mode}`),
        }).parsed,
      ),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
      issue: {
        include: [{ file: '../**/src/**/*.{ts,tsx}' }, { file: '**/src/**/*.{ts,tsx}' }],
        exclude: [
          { file: '**/src/**/__tests__/**' },
          { file: '**/src/**/?(*.){spec|test}.*' },
          { file: '**/src/setupProxy.*' },
        ],
      },
    }),

    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
  ];

  if (isDev) {
    plugins.push(new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }));
    plugins.push(new ReactRefreshWebpackPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
    if (addons) {
      plugins.push(
        new BundleAnalyzerPlugin({
          openAnalyzer: false,
        }),
      );
    }
  }

  if (isProd) {
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../../public/favicon.ico'),
            to: paths.build,
          },
          {
            from: path.resolve(__dirname, '../../public/manifest.json'),
            to: paths.build,
          },
        ],
      }),
    );

    plugins.push(
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith('.map'));

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
    );
  }

  return plugins;
}
