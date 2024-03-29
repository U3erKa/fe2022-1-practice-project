import { existsSync, promises as fs } from 'fs';
import { resolve } from 'path';
import { READ_FILE_OPTIONS, UPLOADED_IMAGES_PATH } from 'constants/backend';

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

export async function uploadFile(file: File) {
  const fileName = `${Date.now()}-${file.name}`;
  await createFolderIfNotExists(UPLOADED_IMAGES_PATH);
  const filePath = resolve(UPLOADED_IMAGES_PATH, fileName);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await fs.writeFile(filePath, buffer);
  return { fileName, originalFileName: file.name };
}
