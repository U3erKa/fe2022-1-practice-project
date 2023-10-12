import { config } from 'dotenv';
config();
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
  SQUADHELP_BANK_NUMBER,
  SQUADHELP_BANK_NAME,
  SQUADHELP_BANK_EXPIRY,
  SQUADHELP_BANK_CVC,
  SALT_ROUNDS: _SALT_ROUNDS,
} = process.env;

export const SALT_ROUNDS = isNaN(+_SALT_ROUNDS!)
  ? _SALT_ROUNDS!
  : +_SALT_ROUNDS!;
export const CUSTOMER = 'customer';
export const CREATOR = 'creator';
export const MODERATOR = 'moderator';
export const CREATOR_ENTRIES = 'creator_entries';
export const CONTEST_STATUS_ACTIVE = 'active';
export const CONTEST_STATUS_FINISHED = 'finished';
export const CONTEST_STATUS_PENDING = 'pending';
export const CONTESTS_DEFAULT_DIR = 'public/contestFiles/';
export const NAME_CONTEST = 'name';
export const LOGO_CONTEST = 'logo';
export const TAGLINE_CONTEST = 'tagline';
export const OFFER_STATUS_PENDING = 'pending';
export const OFFER_STATUS_APPROVED = 'approved';
export const OFFER_STATUS_DISCARDED = 'discarded';
export const OFFER_STATUS_REJECTED = 'rejected';
export const OFFER_STATUS_WON = 'won';
export const FILES_PATH = path.resolve(__dirname, '../..', 'public');
export const SOCKET_CONNECTION = 'connection';
export const SOCKET_SUBSCRIBE = 'subscribe';
export const SOCKET_UNSUBSCRIBE = 'unsubscribe';
export const NOTIFICATION_ENTRY_CREATED = 'onEntryCreated';
export const NOTIFICATION_CHANGE_MARK = 'changeMark';
export const NOTIFICATION_CHANGE_OFFER_STATUS = 'changeOfferStatus';
export const NEW_MESSAGE = 'newMessage';
export const CHANGE_BLOCK_STATUS = 'CHANGE_BLOCK_STATUS';
export const MONGO_DEPRECATED_MESSAGE =
  'Mongoose models are deprecated. Use sequelize models instead';
export const LOG_PATH = path.resolve(__dirname, 'logs');
export const CRON_DAILY_AT_MIDNIGHT = '0 0 * * *';
export const CRON_EVERY_MINUTE = '* * * * *';
export const READ_FILE_OPTIONS = { encoding: 'utf8' } as const;
