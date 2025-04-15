import { Component } from '@angular/core';
import { SocketService } from '../../../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  /**
   *
   */
  message = '';
  messages: string[] = [];
  private room = 'sala1';
  private subscription!: Subscription;
  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
    this.socketService.joinRoom("sala1");
    this.subscription = this.socketService.onMessage().subscribe((msg) => {
      console.log(msg);
      this.messages.push(msg);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.socketService.disconnect();
  }

  send() {
    this.socketService.sendMessage("sala1", { id: 1, name: "Diego", message: "hola como estas" });
    this.message = '';
  }
}
