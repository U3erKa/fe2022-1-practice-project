import { type NextMiddleware, NextResponse } from 'next/server';
import { checkAccessToken } from 'middlewares/tokenMiddlewares';

export const middleware = function (req) {
  const { headers, nextUrl } = req;
  const shouldCheckAccessToken =
    nextUrl.pathname.startsWith('/api') &&
    !nextUrl.pathname.startsWith('/api/auth');

  try {
    if (shouldCheckAccessToken) {
      checkAccessToken(headers.get('Authorization'));
    }
    return NextResponse.next();
  } catch (error: any) {
    return new NextResponse(error?.message ?? 'Server Error', {
      status: error?.code ?? 500,
    });
  }
} satisfies NextMiddleware;
