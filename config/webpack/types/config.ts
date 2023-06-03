export type Mode = 'production' | 'development';

export interface BuildOptions {
  mode?: Mode;
  isDev?: boolean;
  paths: Paths;
  server?: string;
  port?: number;
  apiUrl?: string;
  addons?: Addons;
  project?: 'storybook' | 'frontend' | 'jest';
}

export interface Paths {
  entry: string;
  build: string;
  html: string;
  favicon: string;
}

export type Addons = boolean | 'bundleanalyzer';

export interface Env {
  mode: Mode;
  port: number;
  addons: Addons;
}
