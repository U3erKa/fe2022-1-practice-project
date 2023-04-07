import moment from 'moment';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { CRON_DAILY_AT_MIDNIGHT, LOG_PATH } from './constants';
import type ApplicationError from './errors/ApplicationError';
import type Mail from 'nodemailer/lib/mailer';

const READ_FILE_OPTIONS = { encoding: 'utf8' } as const;
const CRON_EVERY_MINUTE = '* * * * *';

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

  fs.appendFile(
    path.resolve(LOG_PATH, 'latest.log'),
    `${JSON.stringify(errorToLog, undefined, 2)},\n`,
    READ_FILE_OPTIONS,
  );
};

const sendEmail = (async () => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const _sendEmail = async (attachments: Mail.Attachment[]) => {
    const info = await transporter.sendMail({
      from: '"NodeMailer" <email@example.com>',
      to: 'log.recipient@example.com',
      subject: "Node server's error logs",
      attachments,
    });

    console.log(`Message sent: ${info.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  };

  return _sendEmail;
})();

cron.schedule(CRON_DAILY_AT_MIDNIGHT, async () => {
  const log = await flushLogs();
  if (!log) {
    console.log('Nothing to send via email');
    return;
  }
  console.log('Sending email...');

  (await sendEmail)([{ path: path.resolve(LOG_PATH, log) }]);
});
