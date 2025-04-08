import { Component } from '@angular/core';
import { subYears } from 'date-fns';
import { CountryService } from '../../services/country.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  maxDate: Date;
  genders: string[];
  countries: any[] = [];
  cities: string[] = [];
  registerForm: FormGroup;
  formCounter:number=1;
  constructor(private countryService: CountryService, private fb: FormBuilder) {

    this.genders = ["Masculino", "Femenino"]
    const currentDate = new Date();
    this.maxDate = subYears(currentDate, 18);
    this.registerForm = fb.group({
      firstName: ["", Validators.required],
      middleName: [""],
      lastName: ["", Validators.required],
      secondLastName: [""],
      email: ["", [Validators.required, Validators.email]],
      birthDate: [this.maxDate, Validators.required],
      gender: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required],
      height: ["", [Validators.required, Validators.min(1), Validators.max(250)]],
      description: ["", [Validators.required, Validators.minLength(20), Validators.maxLength(250)]],
    })
  }
  ngOnInit(): void {
    this.itsValidFistForm();
    this.getCountries();

  }
  getCountries() {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    })
  }
  getCitiesByCountry(event: any) {
    console.log(event);
    const country = event.value.name.common;
    this.countryService.getCitiesByCountry(country).subscribe(data => {
      this.cities = data.data;
    })
  }

  itsValidFistForm(): boolean {
    const firstName = this.registerForm.get("firstName")?.valid;
    const middleName = this.registerForm.get("middleName")?.valid;
    const lastName = this.registerForm.get("lastName")?.valid;
    const secondLastName = this.registerForm.get("secondLastName")?.valid;
    const email = this.registerForm.get("email")?.valid;
    const birthDate = this.registerForm.get("birthDate")?.valid;
    const gender = this.registerForm.get("gender")?.valid;
    const country = this.registerForm.get("country")?.valid;
    const city = this.registerForm.get("city")?.valid;
    const height = this.registerForm.get("height")?.valid;
    return firstName! && middleName! && lastName! && secondLastName! && email! && birthDate! && gender! && country! && city! && height!;
  }

  setFormCounter(index:number){
    this.formCounter+=index;
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

}