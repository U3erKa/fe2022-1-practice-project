import { NextResponse, type NextRequest } from 'next/server';
import { BadRequestError } from 'errors';
import { User } from 'models';
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
