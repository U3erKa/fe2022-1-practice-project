import { type NextRequest, NextResponse } from 'next/server';
import { RefreshToken } from 'models';
import TokenError from 'errors/TokenError';
import { verifyRefreshToken } from 'services/jwtService';
import { refreshSession } from 'services/authService';
import handleError from 'utils/errorHandler';

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
