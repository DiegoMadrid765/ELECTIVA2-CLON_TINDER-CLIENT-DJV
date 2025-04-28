import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrl: './matchs.component.scss'
})
export class MatchsComponent {
  user: any;
  showUserInformation = false;
  /**
   *
   */
  responsiveOptions: any[] = [
    {
      breakpoint: '900px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  constructor(private usersService: UsersService, private socketService: SocketService) {


  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUserInformationForMatch();
  }
  getUserInformationForMatch() {
    this.usersService.getUserInformationForMatch().subscribe(data => {
      this.user = data
      console.log(this.user);

    }, error => {


    })
  }
  sendMatch(userId: number) {
    this.user.showModal = true;
    this.socketService.sendMessage("notification_" + userId, this.user);
  }
}
