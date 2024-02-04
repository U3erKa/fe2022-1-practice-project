import { NextResponse, type NextRequest } from 'next/server';
import { BadRequestError, NotFoundError } from 'errors';
import { Event, User } from 'models';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';
import { NewEventSchema } from 'utils/schemas';

export async function GET(req: NextRequest) {
  try {
    const { headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);

    const events = await Event.findAll({ where: { userId } });
    if (!events.length) throw new NotFoundError('Events not found');

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { json, headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const body = await json();

    const result = await NewEventSchema.safeParseAsync(body);
    if (!result.success) throw new BadRequestError('Invalid event data');

    const { data } = result;
    Object.assign(data, { date: new Date(data.date) });
    const user = await User.findByPk(userId);
    if (!user) throw new NotFoundError('User not found');

    const event = await user.createEvent(data);
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
