import { type NextRequest, NextResponse } from 'next/server';
import { Catalog, Conversation } from 'models';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  try {
    const { headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const catalogs = await Catalog.findAll({
      where: { userId },
      attributes: ['_id', 'catalogName'],
      include: {
        model: Conversation,
        as: 'chats',
        attributes: ['_id'],
        through: { attributes: [] },
      },
    });

    return NextResponse.json(catalogs);
  } catch (error) {
    return handleError(error);
  }
}