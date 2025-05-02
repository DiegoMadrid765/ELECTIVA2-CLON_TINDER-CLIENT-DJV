import { Component, Input, SimpleChanges } from '@angular/core';
import { SocketService } from '../../../../../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  @Input() userData: any;
  message: string = "";
  private subscription!: Subscription;
  /**
   *
   */
  constructor(private socketService: SocketService) {

  }
  ngOnInit(): void {


    this.socketService.onConnect().subscribe(() => {
      this.subscription = this.socketService.onMessages().subscribe((data) => {
        console.log("holas");

      });

    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.subscription.unsubscribe();

    if (changes['userData'] && changes['userData'].currentValue) {


      this.onUserChanged();
    }
  }
  onUserChanged() {
    this.socketService.joinRoom("messages_" + this.userData.idMatch);

  }

  sendMessage() {

    this.socketService.sendMessages("messages_" + this.userData.idMatch, "holita");
  }

}
