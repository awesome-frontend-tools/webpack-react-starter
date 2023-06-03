import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

import { buildBabelLoader } from './loaders/babelLoader';
import { BuildOptions } from './types/config';

const regExp = {
  cssModuleRegex: /\.module\.css$/,
  lessModuleRegex: /\.module\.less$/,
  scssModuleRegex: /\.module\.scss$/,
  svgInlineRegexp: /\.inline\.svg$/,
};

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;
  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });

  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

  const cssLoader = [
    {
      test: /\.css$/i,
      use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
    },
    {
      test: /\.less$/,
      exclude: regExp.lessModuleRegex,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: (resPath: string) => Boolean(resPath.includes('.module.')),
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
    {
      test: regExp.lessModuleRegex,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: {
              mode: 'local',
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
        },
        'less-loader',
      ],
    },
  ];

  const assetLoader = {
    test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|eot|ttf|woff|woff2)$/i,
    type: 'asset',
    generator: {
      filename: isDev ? '[name].[hash:8].[ext]' : 'static/media/[name].[hash:8].[ext]',
    },
  };

  return [assetLoader, codeBabelLoader, tsxCodeBabelLoader, ...cssLoader];
}
