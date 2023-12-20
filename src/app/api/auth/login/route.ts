import { User } from 'models';
import { type NextRequest, NextResponse } from 'next/server';
import BadRequestError from 'errors/BadRequestError';
import UserNotFoundError from 'errors/UserNotFoundError';
import { createSession } from 'services/authService';
import handleError from 'utils/handleError';
import { LoginSchema } from 'utils/schemas';

export async function POST(req: NextRequest) {
  try {
    const { json } = req;
    const loginData = await json();

    const result = await LoginSchema.safeParseAsync(loginData);
    if (!result.success) throw new BadRequestError('Invalid data for login');
    const { email, password } = result.data;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      throw new UserNotFoundError('Invalid data for login');
    }

    const responseData = await createSession(user);

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
