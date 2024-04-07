import { NextResponse, type NextRequest } from 'next/server';
import { NotFoundError } from 'errors';
import { Catalog } from 'models';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';

export async function POST(req: NextRequest) {
  try {
    const { headers, json } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const { catalogId, catalogName } = await json();

    const [count, [catalog]] = await Catalog.update(
      { catalogName },
      { where: { _id: catalogId, userId }, returning: true },
    );
    if (!count) {
      throw new NotFoundError('Catalog not found');
    }
    const chats = await catalog!.getChats({
      attributes: ['_id'],
    });
    Object.assign(catalog!.dataValues, { chats: chats.map(({ _id }) => _id) });

    return NextResponse.json(catalog!);
  } catch (error) {
    return handleError(error);
  }
}
