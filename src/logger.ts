import cron from 'node-cron';
import fs from 'fs/promises';
import path from 'path';
import _sendEmail from './email';
import {
  CRON_DAILY_AT_MIDNIGHT,
  LOG_PATH,
  READ_FILE_OPTIONS,
} from './constants/backend';
import type ApplicationError from './errors/ApplicationError';

(async () => {
  try {
    await fs.mkdir(path.resolve(LOG_PATH), {});
  } catch (error) {}
})();

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

  const dataWithoutTrailingComma = data.substring(0, data.length - 2);
  const newLogTimestamp = new Date().toISOString().replaceAll(':', '-');
  const logPath = path.resolve(LOG_PATH, `${newLogTimestamp}.log`);

  const logs: any[] = JSON.parse(`[${dataWithoutTrailingComma}]`);
  const strippedLogs = logs.map(({ stackTrace, ...data }) => data);

  await fs.writeFile(
    logPath,
    JSON.stringify(strippedLogs, undefined, 2),
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

  fs.appendFile(
    path.resolve(LOG_PATH, 'latest.log'),
    `${JSON.stringify(errorToLog, undefined, 2)},\n`,
    READ_FILE_OPTIONS,
  );
};

cron.schedule(CRON_DAILY_AT_MIDNIGHT, async () => {
  const log = await flushLogs();
  if (!log) {
    console.log('Nothing to send via email');
    return;
  }
  console.log('Sending email...');

  const sendEmail = await _sendEmail;
  const { MAIL_LOG_RECIPIENT, MAIL_USER } = process.env;
  sendEmail({
    to: MAIL_LOG_RECIPIENT ?? MAIL_USER,
    subject: "Node server's error logs",
    attachments: [{ path: path.resolve(LOG_PATH, log) }],
  });
});
