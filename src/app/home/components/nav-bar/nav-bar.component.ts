import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  @Input() userData:any;

/**
 *
 */
constructor(private router:Router) {

  
}



  logOut(){
    localStorage.removeItem("token");
    this.router.navigate(["dashboard/login"]);
  }
}
