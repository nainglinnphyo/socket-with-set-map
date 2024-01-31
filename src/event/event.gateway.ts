import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventGateway implements OnGatewayInit, OnGatewayConnection {
  private logger: Logger = new Logger('BackgroundGateway');

  afterInit() {
    this.logger.debug('Initialized');
  }
  private map = new Map();

  handleConnection(client: Socket) {
    console.log('connect client ', client.id);
    // this.map.push(client.id);
    // console.log(this.map.length);
    this.map.set(client.handshake.query.userId, client.id);
    console.log(this.map.size);
  }

  async handleDisconnect(client: Socket) {
    console.log('disconnect client ', client.id);
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('hello-world')
  async helloWorld(client: Socket) {
    console.log(this.map.length);
    this.server.emit('hello-world', 'hey hey data');
    return 'hey data';
  }
}
