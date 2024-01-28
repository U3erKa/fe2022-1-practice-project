import { NextResponse, type NextMiddleware } from 'next/server';
import { checkAuthorization } from 'utils/checkAuthorization';

export const middleware = function (req) {
  const { headers, nextUrl } = req;
  const shouldCheckAccessToken =
    nextUrl.pathname.startsWith('/api') &&
    !nextUrl.pathname.startsWith('/api/auth');

  try {
    if (shouldCheckAccessToken) {
      checkAuthorization(headers.get('Authorization'));
    }
    return NextResponse.next();
  } catch (error: any) {
    return new NextResponse(error?.message ?? 'Server Error', {
      status: error?.code ?? 500,
    });
  }
} satisfies NextMiddleware;
