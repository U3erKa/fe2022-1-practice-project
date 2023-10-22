import WebSocket from './WebSocket';
import {
  NOTIFICATION_CHANGE_MARK,
  NOTIFICATION_CHANGE_OFFER_STATUS,
  NOTIFICATION_ENTRY_CREATED,
} from '../../constants';

class NotificationController extends WebSocket {
  emitEntryCreated(target: string | string[]) {
    this.io.to(target).emit(NOTIFICATION_ENTRY_CREATED);
  }

  emitChangeMark(target: string | string[]) {
    this.io.to(target).emit(NOTIFICATION_CHANGE_MARK);
  }

  emitChangeOfferStatus(
    target: string | string[],
    message: string,
    contestId: string | number,
  ) {
    this.io
      .to(target)
      .emit(NOTIFICATION_CHANGE_OFFER_STATUS, { message, contestId });
  }
}

export default NotificationController;
