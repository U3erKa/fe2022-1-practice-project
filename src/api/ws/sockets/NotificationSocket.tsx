import { toast } from 'react-toastify';
import { Notification } from 'components/general';
import {
  NOTIFICATION_CHANGE_MARK,
  NOTIFICATION_CHANGE_OFFER_STATUS,
  NOTIFICATION_ENTRY_CREATED,
  SOCKET_SUBSCRIBE,
  SOCKET_UNSUBSCRIBE,
} from 'constants/general';
import type { ChatId } from 'types/api/_common';
import WebSocket from './WebSocket';

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
          contestId={message.contestId}
          message={message.message}
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
