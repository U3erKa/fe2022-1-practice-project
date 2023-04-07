import fs from 'fs/promises';
import path from 'path';
import type { ErrorRequestHandler } from 'express';

const LOG_PATH = path.resolve(__dirname, '../logs/latest.log');
(async () => {
  try {
    await fs.readFile(LOG_PATH);
  } catch (error) {
    await fs.writeFile(LOG_PATH, '', { encoding: 'utf8' });
  }
})();

const handleError: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  if (
    err.message ===
      'new row for relation "Banks" violates check constraint "Banks_balance_ck"' ||
    err.message ===
      'new row for relation "Users" violates check constraint "Users_balance_ck"'
  ) {
    err.message = 'Not Enough money';
    err.code = 406;
  }
  if (!err.message || !err.code) {
    res.status(500).send('Server Error');
  } else {
    res.status(err.code).send(err.message);
  }
};

export default handleError;
