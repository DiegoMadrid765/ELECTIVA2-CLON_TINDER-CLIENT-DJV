import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent {
  usersChats: any[] = [];
  selectedUser: any = null;
  chatComponentKey = 0;
  constructor(private userService: UsersService) {
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getChatsList();
  }
  getChatsList() {
    this.userService.getChatsLists().subscribe(data => {
      this.usersChats = data;

    })
  }
  setSelectedUser(user: any) {
    this.selectedUser = null; // Forzar reinicio
    setTimeout(() => {
      this.selectedUser = user;
      this.chatComponentKey++;
    });
  }
}
