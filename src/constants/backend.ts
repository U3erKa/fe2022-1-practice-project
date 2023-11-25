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
  POSTGRES_DB_STRING,
} = process.env;

export const SALT_ROUNDS = isNaN(+_SALT_ROUNDS!)
  ? _SALT_ROUNDS!
  : +_SALT_ROUNDS!;
export const CREATOR_ENTRIES = 'creator_entries';
export const CONTESTS_DEFAULT_DIR = 'public/contestFiles/';
export const SOCKET_CONNECTION = 'connection';
export const SOCKET_SUBSCRIBE = 'subscribe';
export const SOCKET_UNSUBSCRIBE = 'unsubscribe';
export const NOTIFICATION_ENTRY_CREATED = 'onEntryCreated';
export const NOTIFICATION_CHANGE_MARK = 'changeMark';
export const NOTIFICATION_CHANGE_OFFER_STATUS = 'changeOfferStatus';
export const NEW_MESSAGE = 'newMessage';
export const MONGO_DEPRECATED_MESSAGE =
  'Mongoose models are deprecated. Use sequelize models instead';
export const LOG_PATH = path.resolve(__dirname, '../logs') as `${string}/logs`;
export const FILES_PATH = path.resolve(
  __dirname,
  '../../public',
) as `${string}/public`;
export const UPLOADED_IMAGES_PATH = path.resolve(
  FILES_PATH,
  'images',
) as `${typeof FILES_PATH}/images`;
export const CRON_DAILY_AT_MIDNIGHT = '0 0 * * *';
export const CRON_EVERY_MINUTE = '* * * * *';
export const READ_FILE_OPTIONS = { encoding: 'utf8' } as const;
