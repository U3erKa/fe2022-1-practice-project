import { NextResponse } from 'next/server';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { saveErrorToLog } from 'logger';

const handleError = (err: any) => {
  saveErrorToLog(err);

  if (err instanceof TokenExpiredError) {
    err.message = 'Token expired';
    (err as any).code = 419;
  } else if (err instanceof JsonWebTokenError) {
    err.message = 'Invalid token';
    (err as any).code = 405;
  } else if (
    err.message ===
      'new row for relation "Banks" violates check constraint "Banks_balance_ck"' ||
    err.message ===
      'new row for relation "Users" violates check constraint "Users_balance_ck"'
  ) {
    err.message = 'Not Enough money';
    err.code = 406;
  }

  return new NextResponse(err?.message ?? 'Server Error', {
    status: err.code ?? 500,
  });
};

export default handleError;
