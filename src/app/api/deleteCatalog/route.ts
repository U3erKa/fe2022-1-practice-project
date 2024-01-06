import { type NextRequest, NextResponse } from 'next/server';
import { Catalog } from 'models';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  try {
    const { headers, json } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const { catalogId } = await json();

    await Catalog.destroy({ where: { _id: catalogId, userId } });
    return new NextResponse<void>();
  } catch (error) {
    return handleError(error);
  }
}
