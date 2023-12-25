import { toast } from 'react-toastify';
import WebSocket from './WebSocket';
import { Notification } from 'components/general';
import type { ChatId } from 'types/api/_common';

class NotificationSocket extends WebSocket {
  anotherSubscribes = () => {
    this.onEntryCreated();
    this.onChangeMark();
    this.onChangeOfferStatus();
  };

  onChangeMark = () => {
    this.socket.on('changeMark', () => {
      toast('Someone liked your offer');
    });
  };

  onChangeOfferStatus = () => {
    this.socket.on('changeOfferStatus', (message) => {
      toast(
        <Notification
          message={message.message}
          contestId={message.contestId}
        />,
      );
    });
  };

  onEntryCreated = () => {
    this.socket.on('onEntryCreated', () => {
      toast('New Entry');
    });
  };

  subscribe = (id: ChatId) => {
    this.socket.emit('subscribe', id);
  };

  unsubscribe = (id: ChatId) => {
    this.socket.emit('unsubscribe', id);
  };
}

export default NotificationSocket;
