// import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import webpack from 'webpack';

export function buildOptimization(): webpack.Configuration['optimization'] {
  return {
    // minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoint: any) => `runtime-${entrypoint.name}`,
    },
  };
}
