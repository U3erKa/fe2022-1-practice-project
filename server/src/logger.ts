import moment from 'moment';
import fs from 'fs/promises';
import path from 'path';
import type ApplicationError from './errors/ApplicationError';

const READ_FILE_OPTIONS = { encoding: 'utf8' } as const;

(async (filename: string) => {
  try {
    await fs.readFile(path.resolve(LOG_PATH, filename), READ_FILE_OPTIONS);
  } catch (error) {
    await fs.writeFile(path.resolve(LOG_PATH, filename), '', READ_FILE_OPTIONS);
  }
})('latest.log');

const flushLogs = async () => {
  const data = await fs.readFile(`${LOG_PATH}/latest.log`, READ_FILE_OPTIONS);
  if (!data) return;

  const logs = JSON.parse(`[${data.substring(0, data.length - 2)}]`);
  const newLogTimestamp = moment().format('YYYY-MM-DD-x');
  const logPath = path.resolve(LOG_PATH, `${newLogTimestamp}.log`);

  await fs.writeFile(
    logPath,
    JSON.stringify(logs, undefined, 2),
    READ_FILE_OPTIONS,
  );
  await fs.writeFile(
    path.resolve(LOG_PATH, 'latest.log'),
    '',
    READ_FILE_OPTIONS,
  );
  return logPath;
};

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
