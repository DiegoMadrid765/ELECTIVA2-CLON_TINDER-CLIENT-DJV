import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeRoutingModule } from './home-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { HomeComponent } from './home.component';
import { MatchsComponent } from './pages/matchs/matchs.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ChatComponent } from './pages/chats/components/chat/chat.component';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    MatchsComponent,
    ChatsComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimengModule,
    FormsModule
  ],

})
export class HomeModule { }
