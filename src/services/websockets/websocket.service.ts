import SockJS from 'sockjs-client';
// eslint-disable-next-line import/no-unresolved
import { Client, IMessage, Stomp } from '@stomp/stompjs';

interface MessageCallback {
  (_message: IMessage): void;
}

class WebSocketService {
  private stompClient: Client;

  constructor(url: string) {
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  connect(callback: MessageCallback): void {
    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/messages', (_message) => {
        callback(JSON.parse(_message.body));
      });
    };
    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient.active) {
      this.stompClient.deactivate();
      console.log('Websocket Disconnected');
    }
  }

  subscribe(chat: string, callback: MessageCallback): void {
    if (this.stompClient.active) {
      this.stompClient.subscribe(chat, callback);
    }
  }

  sendMessage(chat: string, message: string): void {
    this.stompClient.publish({ destination: chat, body: message });
  }
}

const webSocketService = new WebSocketService(import.meta.env.VITE_REACT_APP_BACKEND_WS_URL);
export default webSocketService;
