import SockJS from 'sockjs-client';
// eslint-disable-next-line import/no-unresolved
import { Client, IMessage, Stomp } from '@stomp/stompjs';

interface MessageCallback {
  // eslint-disable-next-line no-unused-vars
  (message: IMessage): void;
}

class WebSocketService {
  private stompClient: Client | undefined;

  // eslint-disable-next-line no-unused-vars
  constructor(private url: string) {}

  connect(onConnect: () => void = (): void => {}, onError: () => void = (): void => {}): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.stompClient && this.stompClient.connected) {
        resolve();
      } else {
        const socket = new SockJS(this.url);

        this.stompClient = Stomp.over(socket);

        this.stompClient.debug = () => {};

        this.stompClient.connect(
          {},
          () => {
            onConnect();
            console.log('WebSocket connected!');
            resolve();
          },
          (error: never) => {
            console.error('WebSocket connection failed:', error);
            onError();
            reject(error);
          },
        );
      }
    });
  }

  subscribe(topic: string, onMessage: MessageCallback) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.subscribe(topic, (message) => {
        onMessage(message);
        console.log('Message received:', message);
      });
    } else {
      console.error('Cannot subscribe: WebSocket connection is not active');
    }
  }

  sendMessage(destination: string, body: string) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(destination, {}, body);
      console.log('Message sent:', body);
    } else {
      console.error('Cannot send message: WebSocket connection is not active');
    }
  }

  isConnected() {
    return this.stompClient && this.stompClient.connected;
  }

  disconnect(onDisconnect: () => void) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
        onDisconnect();
      });
    } else {
      console.error('Cannot disconnect: WebSocket connection is not active');
    }
  }
}

const webSocketService = new WebSocketService(import.meta.env.VITE_REACT_APP_BACKEND_WS_URL);
export default webSocketService;
