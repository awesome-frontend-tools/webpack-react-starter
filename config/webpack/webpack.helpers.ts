import path from 'path';

const cwd = process.cwd();

/**
 * Создание объект с ссылками на пути
 * @param aliases список ссылок { [key: string]: string }
 * @returns объект с ссылками на пути
 */
export function createWebpackAliases(aliases: any) {
  const result: any = {};
  for (const name in aliases) {
    result[name] = path.join(cwd, aliases[name]);
  }
  return result;
}
