import {
  NOTIFICATION_CHANGE_MARK,
  NOTIFICATION_CHANGE_OFFER_STATUS,
  NOTIFICATION_ENTRY_CREATED,
} from 'constants/general';
import WebSocket from './WebSocket';

class NotificationController extends WebSocket {
  emitEntryCreated(target: string[] | string) {
    this.io.to(target).emit(NOTIFICATION_ENTRY_CREATED);
  }

  emitChangeMark(target: string[] | string) {
    this.io.to(target).emit(NOTIFICATION_CHANGE_MARK);
  }

  emitChangeOfferStatus(
    target: number | string,
    message: string,
    contestId: number,
  ) {
    this.io
      .to(target as string)
      .emit(NOTIFICATION_CHANGE_OFFER_STATUS, { contestId, message });
  }
}

export default NotificationController;
