import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { SocketService } from '../../../services/socket.service';
import { MatchService } from '../../../services/match.service';
import { HobbiesService } from '../../../services/hobbies.service';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-matchs',
  templateUrl: './matchs.component.html',
  styleUrl: './matchs.component.scss'
})
export class MatchsComponent {
  user: any;
  loggedUser: any;
  showUserInformation = false;
  loadingMatch:boolean=false;
  hobbies:any[]=[];
  countries:any[]=[];
  cities:any[]=[];
  selectedCountry:any;
  selectedCity:string="";
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
  constructor(public usersService: UsersService, private socketService: SocketService, private matchService: MatchService,private hobbiesService:HobbiesService,private countryService:CountryService) {


  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUserInformationForMatch();
    this.getLoggedUserInformation();
    this.getHobbies();
    this.getCountries();
  }
  getUserInformationForMatch() {
    this.loadingMatch=true;
    this.usersService.getUserInformationForMatch().subscribe(data => {
      this.user = data;
  this.loadingMatch=false;
    }, error => {
      this.loadingMatch=false;

    })
  }

   getUserInformationForMatchFilter() {
    this.loadingMatch=true;
    console.log(this.selectedCountry);
    
    this.usersService.getUserInformationForMatchFilter(this.selectedCountry.name.common,this.selectedCity).subscribe(data => {
      this.user = data;
  this.loadingMatch=false;
    }, error => {
      this.loadingMatch=false;

    })
  }

  sendMatch(userId: number) {
    this.matchService.registerMatch(userId).subscribe(data => {
      this.loggedUser["showModal"] = true;
      this.socketService.sendMessage("notification_" + userId, this.loggedUser);
      this.getUserInformationForMatch();
    })


  }
  getLoggedUserInformation() {
    this.usersService.getLoggedUserInformation().subscribe(data => {
      this.loggedUser = data;
   

    });

  }

    getHobbies() {
    this.hobbiesService.getHobbies().subscribe(data => {
      this.hobbies = data;
      console.log(this.hobbies);


    })
  }

    getCountries() {

    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    })
  }
  getCitiesByCountry(event: any) {
    const country = event.value.name.common;
    const cosuntryCode = event.value.cca2;
    this.countryService.getCitiesByCountry(country).subscribe(data => {
      this.cities = data.data;
    });
  }

  cleanFilters(){
    this.selectedCountry="";
    this.selectedCity="";
    this.getUserInformationForMatch();
  }

}
