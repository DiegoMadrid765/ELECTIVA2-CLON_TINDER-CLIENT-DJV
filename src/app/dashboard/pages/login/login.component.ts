import { Component } from '@angular/core';
import { SocketService } from '../../../services/socket.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../../../services/auth-user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  /**
   *
   */
  message = '';
  messages: string[] = [];
  private room = 'sala1';
  private subscription!: Subscription;
  loginIn = false;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authUserSerive: AuthUserService, private messageService: MessageService,private router:Router) {
    this.loginForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    })
  }

  ngOnInit() {
  
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.loginIn = true;
    const body = {
      email,
      password
    };

    this.authUserSerive.login(body).subscribe(data => {
      const { token }: any = data;
      localStorage.setItem("token", token);
      this.loginIn = false;
      this.router.navigate(["home"])
    }, error => {
      const { title, description, type } = error.error;
      this.messageService.clear();
      this.messageService.add({ severity: type, summary: title, detail: description });
      this.loginIn = false;
    })
  }


}
