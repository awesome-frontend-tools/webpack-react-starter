import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { BuildOptions } from './types/config';

export function buildDevServer(options?: BuildOptions): DevServerConfiguration {
  return {
    // Порт запуска сервера
    port: options?.port,
    // Протокол запуска сервера
    server: options?.server || 'https',
    // Открыть браузер после запуска сервера
    open: true,
    // Включить gzip-сжатие сгенерированных файлов.
    compress: true,
    // Включить горячую перезагрузку сервера.
    hot: true,
    // Показывать index.html вместо ошибки 404
    historyApiFallback: true,
  };
}
