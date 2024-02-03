import SockJS from 'sockjs-client';
// eslint-disable-next-line import/no-unresolved
import { Client, IFrame, IMessage, Stomp } from '@stomp/stompjs';
import { WebSocket } from 'vite';

interface MessageCallback {
  // eslint-disable-next-line no-unused-vars
  (message: IMessage): void;
}

class WebsocketService {
  private stompClient: Client | undefined;

  // eslint-disable-next-line no-unused-vars
  constructor(private url: string) {}

  connect(onConnect: () => void = (): void => {}, onError: () => void = (): void => {}): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.stompClient && this.stompClient.connected) {
        resolve();
      } else {
        const socket: WebSocket = new SockJS(this.url);

        this.stompClient = Stomp.over(socket);

        this.stompClient.debug = (): void => {};

        this.stompClient.connect(
          {},
          (): void => {
            onConnect();
            console.log('WebSocket connected!');
            resolve();
          },
          (error: never): void => {
            onError();
            console.error('WebSocket connection failed:', error);
            reject(error);
          },
        );

        this.stompClient.onStompError = (frame: IFrame): void => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        };
      }
    });
  }

  public subscribe(channel: string, callback: (message: Stomp.Message) => void): void {
    if (this.stompClient && this.stompClient.connected) {
      console.log('Subscribing to channel:', channel);
      this.stompClient.subscribe(channel, callback);
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

const webSocketService = new WebsocketService(import.meta.env.VITE_REACT_APP_BACKEND_WS_URL);
export default webSocketService;
