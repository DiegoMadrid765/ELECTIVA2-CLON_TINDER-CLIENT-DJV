import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimengModule,ReactiveFormsModule
  ]
})
export class DashboardModule { }
