import { existsSync, promises as fs } from 'fs';
import { resolve } from 'path';
import { READ_FILE_OPTIONS } from 'constants/backend';

export async function createFolderIfNotExists(path: string) {
  if (existsSync(path)) return;
  await fs.mkdir(path, { recursive: true });
}

export async function createFileIfNotExists(path: string) {
  if (existsSync(path)) return;
  const slashIndex = path.lastIndexOf('/');
  const folder = path.substring(0, slashIndex);
  const file = path.substring(slashIndex + 1);

  if (!existsSync(folder)) await createFolderIfNotExists(resolve(folder));
  await fs.writeFile(resolve(folder, file), '', READ_FILE_OPTIONS);
}
