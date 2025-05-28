import { Component, Input, SimpleChanges } from '@angular/core';
import { SocketService } from '../../../../../services/socket.service';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../../../services/users.service';
import { AuthUserService } from '../../../../../services/auth-user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  @Input() userData: any;
  message: string = "";
  private subscription!: Subscription;
  messages:any[]=[];
  loggedUserId:number=0;
  /**
   *
   */
  constructor(private socketService: SocketService, private userService: UsersService, private authService: AuthUserService) {

  }
  ngOnInit(): void {


    this.socketService.onConnect().subscribe(() => {
      this.subscription = this.socketService.onMessages().subscribe((data) => {


        
        this.messages.push(data);
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
    this.messages=[];
    this.loggedUserId = this.authService.getUserId();
    this.getMessages();
    this.socketService.joinRoom("messages_" + this.userData.idMatch);
  }
  sendMessage() {
    if(!this.message.trim()){
      return;
    }
    const userId = this.authService.getUserId();
    this.userService.registerChat(this.userData.idMatch, this.message).subscribe(data => {
  
      const body = {
        message: this.message,
        userId,
        date:new Date()
      }

      this.message="";
      this.sendMessageSocket(body);
    },error=>{

    })
  }
  sendMessageSocket(body: any) {

    this.socketService.sendMessages("messages_" + this.userData.idMatch, body);
  }

  getMessages(){
    this.userService.getMessages(this.userData.idMatch).subscribe(data=>{
  
      this.messages=data;
    })
  }

}
