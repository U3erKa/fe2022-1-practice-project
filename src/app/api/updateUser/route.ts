import { type NextRequest, NextResponse } from 'next/server';
import { updateUser } from 'controllers/queries/userQueries';
import { verifyAccessToken } from 'services/jwtService';
import { uploadFile } from 'utils/backend';
import handleError from 'utils/handleError';

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
      avatar: updatedUser.avatar,
      balance: updatedUser.balance,
      displayName: updatedUser.displayName,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      id: updatedUser.id,
      lastName: updatedUser.lastName,
      role: updatedUser.role,
    });
  } catch (err) {
    return handleError(err);
  }
}
