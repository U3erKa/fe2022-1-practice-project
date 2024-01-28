import { toast } from 'react-toastify';
import { Notification } from 'components/general';
import type { NotificationProps } from 'components/general/Notification';
import {
  NOTIFICATION_CHANGE_MARK,
  NOTIFICATION_CHANGE_OFFER_STATUS,
  NOTIFICATION_ENTRY_CREATED,
  SOCKET_SUBSCRIBE,
  SOCKET_UNSUBSCRIBE,
} from 'constants/general';
import type { ChatId } from 'types/_common';
import WebSocket from './WebSocket';

class NotificationSocket extends WebSocket {
  anotherSubscribes() {
    this.socket
      .on(NOTIFICATION_ENTRY_CREATED, () => {
        toast('New Entry');
      })
      .on(NOTIFICATION_CHANGE_MARK, () => {
        toast('Someone liked your offer');
      })
      .on(NOTIFICATION_CHANGE_OFFER_STATUS, (message: NotificationProps) => {
        toast(<Notification {...message} />);
      });
  }

  subscribe(id: ChatId) {
    this.socket.emit(SOCKET_SUBSCRIBE, id);
  }

  unsubscribe(id: ChatId) {
    this.socket.emit(SOCKET_UNSUBSCRIBE, id);
  }
}

export default NotificationSocket;
