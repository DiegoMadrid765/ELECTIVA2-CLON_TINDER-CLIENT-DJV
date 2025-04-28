import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeRoutingModule } from './home-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { HomeComponent } from './home.component';
import { MatchsComponent } from './pages/matchs/matchs.component';
import { ChatsComponent } from './pages/chats/chats.component';





@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    MatchsComponent,
    ChatsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimengModule
  ],

})
export class HomeModule { }
