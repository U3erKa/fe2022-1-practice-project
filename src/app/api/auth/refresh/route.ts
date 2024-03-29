import { NextResponse, type NextRequest } from 'next/server';
import { TokenError } from 'errors';
import { RefreshToken } from 'models';
import { refreshSession } from 'services/authService';
import { verifyRefreshToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  try {
    const { json } = req;
    const { refreshToken } = await json();

    await verifyRefreshToken(refreshToken);

    const refreshTokenInstance = await RefreshToken.findOne({
      where: {
        token: refreshToken,
      },
    });

    if (!refreshTokenInstance) {
      throw new TokenError('Invalid refresh token');
    }

    const responseData = await refreshSession(refreshTokenInstance);

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
