import { template } from 'radash';
import { promises as fs } from 'fs';
import path from 'path';
import sendEmail from 'email';
import { READ_FILE_OPTIONS } from 'constants/backend';
import type { Offer as _Offer, User as _User } from 'types/models';

export async function sendCreatorOfferEmail(offer: _Offer, command: string) {
  try {
    const user = (await offer.getUser()) as unknown as _User;
    const fullName = `${user.firstName} ${user.lastName}`;
    const offerText = offer.text ?? (offer.originalFileName as string);
    const action =
      command === 'approve'
        ? 'approved it. The offer is visible to customers now!'
        : 'discarded it. Please send appropriate offer next time.';

    const email = await fs.readFile(
      path.resolve(__dirname, '../email/moderatedCreatorOffer.html'),
      READ_FILE_OPTIONS,
    );
    const html = template(email, { command, fullName, offerText, action });

    return await sendEmail({
      to: `"${fullName}" <${user.email}>`,
      subject: `We decided to ${command} your offer`,
      text: `Hello ${fullName}!
You have sent offer "${offerText}". Our moderator reviewed it and ${action}
Sincerely,
Squadhelp team.`,
      html,
    });
  } catch (error) {}
}
