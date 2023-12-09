import { type NextRequest, NextResponse } from 'next/server';
import { updateUser } from 'controllers/queries/userQueries';
import { verifyAccessToken } from 'services/jwtService';
import handleError from 'utils/handleError';
import { uploadFile } from 'utils/backend';

export async function POST(req: NextRequest) {
  try {
    const { formData, headers } = req;
    const authorization = headers.get('Authorization')!.split(' ')[1]!;
    const { userId } = await verifyAccessToken(authorization);
    const data = await formData();
    const { file, ...restBody } = Object.fromEntries(data);

    if (file instanceof File) {
      const fileData = await uploadFile(file);
      restBody.avatar = fileData.fileName;
    }
    const updatedUser = await updateUser(restBody, userId);

    return NextResponse.json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    });
  } catch (err) {
    return handleError(err);
  }
}
