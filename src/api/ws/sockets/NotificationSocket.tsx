import { toast } from 'react-toastify';
import WebSocket from './WebSocket';
import { Notification } from 'components/general';
import type { ChatId } from 'types/api/_common';
import {
  NOTIFICATION_CHANGE_MARK,
  NOTIFICATION_CHANGE_OFFER_STATUS,
  NOTIFICATION_ENTRY_CREATED,
  SOCKET_SUBSCRIBE,
  SOCKET_UNSUBSCRIBE,
} from 'constants/general';

class NotificationSocket extends WebSocket {
  anotherSubscribes = () => {
    this.onEntryCreated();
    this.onChangeMark();
    this.onChangeOfferStatus();
  };

  onChangeMark = () => {
    this.socket.on(NOTIFICATION_CHANGE_MARK, () => {
      toast('Someone liked your offer');
    });
  };

  onChangeOfferStatus = () => {
    this.socket.on(NOTIFICATION_CHANGE_OFFER_STATUS, (message) => {
      toast(
        <Notification
          message={message.message}
          contestId={message.contestId}
        />,
      );
    });
  };

  onEntryCreated = () => {
    this.socket.on(NOTIFICATION_ENTRY_CREATED, () => {
      toast('New Entry');
    });
  };

  subscribe = (id: ChatId) => {
    this.socket.emit(SOCKET_SUBSCRIBE, id);
  };

  unsubscribe = (id: ChatId) => {
    this.socket.emit(SOCKET_UNSUBSCRIBE, id);
  };
}

export default NotificationSocket;
