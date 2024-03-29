import { promises as fs } from 'fs';
import path from 'path';
import { template } from 'radash';
import sendEmail from 'email';
import { READ_FILE_OPTIONS } from 'constants/backend';
import { OFFER_COMMAND_APPROVE } from 'constants/general';
import type { Offer as _Offer } from 'types/models';

export async function sendCreatorOfferEmail(offer: _Offer, command: string) {
  try {
    const user = await offer.getUser();
    const fullName = `${user.firstName} ${user.lastName}`;
    const offerText = offer.text ?? (offer.originalFileName as string);
    const action =
      command === OFFER_COMMAND_APPROVE
        ? 'approved it. The offer is visible to customers now!'
        : 'discarded it. Please send appropriate offer next time.';

    const email = await fs.readFile(
      path.resolve(__dirname, '../email/moderatedCreatorOffer.html'),
      READ_FILE_OPTIONS,
    );
    const html = template(email, { action, command, fullName, offerText });

    await sendEmail({
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
