import WebSocket from './WebSocket';
import {
  NOTIFICATION_ENTRY_CREATED,
  NOTIFICATION_CHANGE_MARK,
  NOTIFICATION_CHANGE_OFFER_STATUS,
} from '../../constants';

class NotificationController extends WebSocket {
  emitEntryCreated(target) {
    this.io.to(target).emit(NOTIFICATION_ENTRY_CREATED);
  }

  emitChangeMark(target) {
    this.io.to(target).emit(NOTIFICATION_CHANGE_MARK);
  }

  emitChangeOfferStatus(target, message, contestId) {
    this.io
      .to(target)
      .emit(NOTIFICATION_CHANGE_OFFER_STATUS, { message, contestId });
  }
}

export default NotificationController;
