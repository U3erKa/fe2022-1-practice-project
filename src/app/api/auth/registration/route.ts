import { type NextRequest, NextResponse } from 'next/server';
import { User } from 'models';
import BadRequestError from 'errors/BadRequestError';
import { createSession } from 'services/authService';
import handleError from 'utils/handleError';
import { RegistrationSchema } from 'utils/schemas';

export async function POST(req: NextRequest) {
  try {
    const { json } = req;
    const userData = await json();

    const result = await RegistrationSchema.safeParseAsync(userData);
    if (!result.success)
      throw new BadRequestError('Invalid data for registration');
    const { data } = result;

    const user = await User.create(data);
    const responseData = await createSession(user);

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
