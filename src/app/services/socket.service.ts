import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly SERVER_URL = 'http://localhost:3000'; // Ajusta esto si usas dominio/productivo

  constructor() {

    this.socket = io(this.SERVER_URL, {
      // Si quieres mandar headers (como token):
      // auth: {
      //   token: 'TU_TOKEN'
      // }
    });

  }

  
  joinRoom(room: string) {
    this.socket.emit('join_room', room);
  }

  sendMessage(room: string, body:any) {
    this.socket.emit('send_message', { room, body });
  }

  // Escuchar mensajes de la sala
  onMessage(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('receive_message', (message: string) => {
        observer.next(message);
      });
    });
  }

  // Desconectar socket
  disconnect() {
    this.socket.disconnect();
  }
  

}
