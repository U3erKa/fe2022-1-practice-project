import fs from 'fs/promises';
import { LOG_PATH } from './constants';
import type ApplicationError from './errors/ApplicationError';

(async () => {
  try {
    await fs.readFile(LOG_PATH);
  } catch (error) {
    await fs.writeFile(LOG_PATH, '', { encoding: 'utf8' });
  }
})();

export const saveErrorToLog = async ({
  message,
  stack: stackTrace,
  code = 500,
}: ApplicationError) => {
  const errorToLog = { message, stackTrace, code, time: Date.now() };

  fs.appendFile(LOG_PATH, `${JSON.stringify(errorToLog, undefined, 2)},\n`, {
    encoding: 'utf8',
  });
};
