import { Component } from '@angular/core';
import { AuthUserService } from '../services/auth-user.service';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userData: any;
  userPhoto: any;
  showModal = false;
  usersForMatch:any[]=[];
  private subscription!: Subscription;
  constructor(private usersService: UsersService, private socketService: SocketService, private authUserService: AuthUserService) {

  }
  ngOnInit(): void {

    const userId = this.authUserService.getUserId();
    this.socketService.joinRoom("notification_" + userId);
    this.subscription = this.socketService.onMessage().subscribe((data) => {
      this.usersForMatch.push(data);
      console.log(data);
      
      this.showModal = true;
      const audio = new Audio();
      audio.src = "./../../assets/audio/notification.mp3";
      audio.load();
      audio.play();
    });

    this.getLoggedUserInformation();

  }

  getLoggedUserInformation() {
    this.usersService.getLoggedUserInformation().subscribe(data => {
      this.userData = data;
      this.usersService.userInformation = data;
    });
    this.userData = this.usersService.userInformation;


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.socketService.disconnect();
  }

  send() {
    this.socketService.sendMessage("notification_104", this.userData);
  }
}
