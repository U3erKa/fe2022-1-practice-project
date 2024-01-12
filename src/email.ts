import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;
let user = MAIL_USER;
let pass = MAIL_PASS;
if (!MAIL_USER || !MAIL_PASS) {
  const testAccount = await nodemailer.createTestAccount();
  ({ user, pass } = testAccount);
}

const transporter = nodemailer.createTransport({
  // @ts-expect-error
  host: MAIL_HOST ?? 'smtp.ethereal.email',
  port: MAIL_PORT ?? 587,
  secure: MAIL_PORT === '465',
  auth: {
    user,
    pass,
  },
});

const sendEmail = async (options: Mail.Options) => {
  Object.assign(options, { from: `"Squadhelp" <${user}>` });
  const info = await transporter.sendMail(options);
  /* eslint-disable no-console */
  console.log(`Message sent: ${info.messageId}`);
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  /* eslint-enable no-console */
};

export default sendEmail;
