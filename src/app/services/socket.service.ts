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

    });

  }

  onConnect(): Observable<void> {
    return new Observable(observer => {
      if (this.socket.connected) {
        observer.next();
        observer.complete();
      } else {
      
        this.socket.on('connect', () => {
       
          observer.next();
          observer.complete();
        });
      }
    });
  }

  
  joinRoom(room: string) {
    this.socket.emit('join_room', room);  
  }

  sendMessage(room: string, body:any) {
    this.socket.emit('send_message', { room, body });
  }

  sendMatch(room: string, body:any) {
    this.socket.emit('send_match', { room, body });
  }

  sendMessages(room: string, body:any) {
    this.socket.emit('send_messages', { room, body });
  }

  // Escuchar mensajes de la sala
  onMessage(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('receive_message', (message: string) => {
        observer.next(message);
      });
    });
  }

  onMessageMatch(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('receive_match', (message: string) => {
        observer.next(message);
      });
    });
  }



  onMessages(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('receive_messages', (message: string) => {
        observer.next(message);
      });
    });
  }

  // Desconectar socket
  disconnect() {
    this.socket.disconnect();
  }
  

}
