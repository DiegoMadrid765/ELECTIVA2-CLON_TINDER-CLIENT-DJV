import { Component, Input, SimpleChanges } from '@angular/core';
import { SocketService } from '../../../../../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  @Input() userData:any;
  message:string="";
  /**
   *
   */
  constructor(private socketService: SocketService) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.socketService.onConnect().subscribe(() => {
      console.log(this.userData);
      
      // this.socketService.joinRoom("notification_" + userId);
      // this.socketService.joinRoom("notificationmatch_" + userId);
  
      // this.subscription = this.socketService.onMessage().subscribe((data) => {
      //   this.usersForMatch.push(data);  
      //   const audio = new Audio();
      //   audio.src = "./../../assets/audio/notification.mp3";
      //   audio.load();
      //   audio.play();
      // });
  
      // this.subscription = this.socketService.onMessages().subscribe((data) => {
      //   const audio = new Audio();
      //   audio.src = "./../../assets/audio/tindermatch.mp3";
      //   audio.load();
      //   audio.play();      
      //   this.getConfetti();
      //   this.usersMatches.push(data);
      // });
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData'] && changes['userData'].currentValue) {
      this.onUserChanged();
    }
  }
  onUserChanged() {
    // Aquí va la lógica que deseas ejecutar cada vez que se selecciona un nuevo usuario
    console.log('Nuevo usuario seleccionado:', this.userData);
    this.socketService.joinRoom("messages_" + this.userData.idMatch);
    // ... cualquier otro código que reinicie el estado del chat
  }
}
