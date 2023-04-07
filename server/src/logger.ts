import moment from 'moment';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import {
  CRON_DAILY_AT_MIDNIGHT,
  LOG_PATH,
  READ_FILE_OPTIONS,
} from './constants';
import type ApplicationError from './errors/ApplicationError';
import type Mail from 'nodemailer/lib/mailer';

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
  const newLogTimestamp = moment().format('YYYY-MM-DD-x');
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

const sendEmail = (async () => {
  const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;
  let user = MAIL_USER!;
  let pass = MAIL_PASS!;
  if (!MAIL_USER || !MAIL_PASS) {
    const testAccount = await nodemailer.createTestAccount();
    user = testAccount.user;
    pass = testAccount.pass;
  }

  const transporter = nodemailer.createTransport({
    // @ts-expect-error
    host: MAIL_HOST ?? 'smtp.ethereal.email',
    port: MAIL_PORT ?? 587,
    secure: MAIL_PORT === '465' ?? false,
    auth: {
      user,
      pass,
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
