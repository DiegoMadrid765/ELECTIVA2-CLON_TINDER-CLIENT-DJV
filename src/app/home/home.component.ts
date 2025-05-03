import { Component } from '@angular/core';
import { AuthUserService } from '../services/auth-user.service';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';
import { SocketService } from '../services/socket.service';
import { MatchService } from '../services/match.service';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userData: any;
  userPhoto: any;
  showModal = false;
  usersForMatch: any[] = [];
  usersMatches: any[] = [];

  private subscription!: Subscription;
  private subscriptionMath!: Subscription;
  constructor(public usersService: UsersService, private socketService: SocketService, private authUserService: AuthUserService, private matchService: MatchService) {
  
  }
  ngOnInit(): void {
    const userId = this.authUserService.getUserId();
    this.socketService.connect();
    this.socketService.onConnect().subscribe(() => {
      this.socketService.joinRoom("notification_" + userId);
      this.socketService.joinRoom("notificationmatch_" + userId);
  
      this.subscription = this.socketService.onMessage().subscribe((data) => {
        this.usersForMatch.push(data);  
        const audio = new Audio();
        audio.src = "./../../assets/audio/notification.mp3";
        audio.load();
        audio.play();
      });
  
      this.subscriptionMath = this.socketService.onMessageMatch().subscribe((data) => {
        const audio = new Audio();
        audio.src = "./../../assets/audio/tindermatch.mp3";
        audio.load();
        audio.play();      
        this.getConfetti();
        this.usersMatches.push(data);
      });
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
    this.subscriptionMath.unsubscribe();
    this.socketService.disconnect();
    
  }

  accpetMacthMatch(isMatch: boolean, userTo: number, index: number) {

    this.matchService.acceptMatch(userTo, isMatch).subscribe(data => {
      this.usersForMatch[index].showModal = false;
      const user = this.userData;
      user["showModal"] = true;
      if (isMatch) {
        this.socketService.sendMatch("notificationmatch_" + userTo, user);

      }

    })
  }
  getConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 9999
    });
  }
  
 
}
