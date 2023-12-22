import cron from 'node-cron';
import sendEmail from 'email';
import { promises as fs } from 'fs';
import path from 'path';
import {
  CRON_DAILY_AT_MIDNIGHT,
  LOG_PATH,
  READ_FILE_OPTIONS,
} from 'constants/backend';
import type ApplicationError from 'errors/ApplicationError';
import { createFileIfNotExists } from 'utils/backend';

const LATEST_LOG_PATH = path.resolve(LOG_PATH, 'latest.log');
await createFileIfNotExists(LATEST_LOG_PATH);

const flushLogs = async () => {
  const data = await fs.readFile(LATEST_LOG_PATH, READ_FILE_OPTIONS);
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
  await fs.writeFile(LATEST_LOG_PATH, '', READ_FILE_OPTIONS);
  return logPath;
};

export const saveErrorToLog = async ({
  code = 500,
  message,
  stack: stackTrace,
}: ApplicationError) => {
  const errorToLog = { code, message, stackTrace, time: Date.now() };

  await fs.appendFile(
    LATEST_LOG_PATH,
    `${JSON.stringify(errorToLog, undefined, 2)},\n`,
    READ_FILE_OPTIONS,
  );
};

cron.schedule(CRON_DAILY_AT_MIDNIGHT, async () => {
  const log = await flushLogs();
  if (!log) return;

  const { MAIL_LOG_RECIPIENT, MAIL_USER } = process.env;
  sendEmail({
    to: MAIL_LOG_RECIPIENT ?? MAIL_USER,
    subject: "Node server's error logs",
    attachments: [{ path: path.resolve(LOG_PATH, log) }],
  });
});
