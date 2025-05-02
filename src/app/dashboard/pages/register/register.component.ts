import { Component } from '@angular/core';
import { subYears } from 'date-fns';
import { CountryService } from '../../../services/country.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HobbiesService } from '../../../services/hobbies.service';
import { Hobby } from '../../models/register';
import { Message } from 'primeng/api';
import { AuthUserService } from '../../../services/auth-user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
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
  formCounter: number = 1;
  hobbies: Hobby[] = [];
  images: any[] = [];
  messages: Message[] = [];
  messages2: Message[] = [];
  validatingFirstForm:boolean=false;
  saving: boolean = false;
  constructor(private countryService: CountryService,
    private fb: FormBuilder,
    private hobbiesService: HobbiesService,
    private authUserSerive: AuthUserService,
    private router: Router) {

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
      selectedCountry: ["", Validators.required],
      countryCode: ["", Validators.required],
      city: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required]],
      height: ["", [Validators.required, Validators.min(1), Validators.max(250)]],
      description: ["", [Validators.required, Validators.minLength(20), Validators.maxLength(250)]],
    }, { validator: this.passwordsMatchValidator });
    this.registerForm.get("city")?.disable();
  }
  ngOnInit(): void {
    this.getCountries();
    this.getHobbies();

  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  getCountries() {

    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    })
  }
  getCitiesByCountry(event: any) {
    const country = event.value.name.common;
    const cosuntryCode = event.value.cca2;
    this.registerForm.get("selectedCountry")?.setValue(country);
    this.registerForm.get("countryCode")?.setValue(cosuntryCode);
    this.registerForm.get("city")?.setValue("");
    this.registerForm.get("city")?.setValue("");
    this.registerForm.get("city")?.disable();
    this.countryService.getCitiesByCountry(country).subscribe(data => {
      this.cities = data.data;
      this.registerForm.get("city")?.enable();
    });
  }

  validateFirstForm() {
   
    const { firstName, lastName, email, birthDate, gender, country, city, height } = this.registerForm.value;
    if (!firstName) {
      this.showMesage("El primer nombre es requerido", "error");
      return;
    } else if (!lastName) {
      this.showMesage("El primer apellido es requerido", "error");
      return;
    } else if (!email) {
      this.showMesage("El primer correo electrónico es requerido", "error");
      return;
    } else if (this.registerForm.get("email")?.hasError("email")) {
      this.showMesage("Ingrese un correo electrónico válido", "error");
      return;
    } else if (!birthDate) {
      this.showMesage("Ingrese una fecha de nacimiento", "error");
      return;
    } else if (!gender) {
      this.showMesage("Seleccione un género", "error");
      return;
    } else if (!country) {
      this.showMesage("Seleccione un país", "error");
      return;
    } else if (!city) {
      this.showMesage("Seleccione una ciudad", "error");
      return;
    } else if (!height) {
      this.showMesage("Ingrese su estatura", "error");
      return;
    } else if (this.registerForm.hasError("passwordsMismatch")) {
      this.showMesage("Las contraseñas no coinciden", "error");
      return;
    }
    //this.setFormCounter(1);
    this.verifyExistsUser();

  }

  validateSecondForm() {
    const { description } = this.registerForm.value;
    const selectedHobbies = this.hobbies.filter(x => x.selected);
    if (!description) {
      this.showMesageSecondForm("La descripción es requerida", "error");
      return;
    }

    if (this.registerForm.get("description")?.hasError("minlength")) {
      this.showMesageSecondForm("La cantidad mínima de caracteres es de 20", "error");
      return;
    }
    if (this.registerForm.get("description")?.hasError("maxlength")) {
      this.showMesageSecondForm("La cantidad máxima de caracteres es de 250", "error");
      return;
    }
    if (selectedHobbies.length < 3) {
      this.showMesageSecondForm("Selecciona mínimo 3 hobbies para continuar", "error");
      return;
    }
    this.setFormCounter(1);
  }



  showMesage(content: string, type: string) {
    this.messages = [{ severity: type, detail: content, life: 4000 }];
  }

  showMesageSecondForm(content: string, type: string) {
    this.messages2 = [{ severity: type, detail: content, life: 4000 }];
  }
  setFormCounter(index: number) {
    this.formCounter += index;
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  async addImage(event: any) {

    const file = event.target.files[0];
    const image = {
      type: file.type.split("/")[1],
      data: await this.convertToBase64(file),
      mainImage: this.images.length == 0 ? true : false
    }
    this.images.push(image);
  }

  setMainPhoto(index: number) {
    this.images.forEach(x => {
      x.mainImage = false;
    })
    this.images.at(index).mainImage = true;
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  getHobbies() {
    this.hobbiesService.getHobbies().subscribe(data => {
      this.hobbies = data;
      console.log(this.hobbies);


    })
  }

  setSelectedHobbie(index: number) {
    this.hobbies[index].selected = !this.hobbies[index].selected;
  }

  registerUser() {
    const { firstName, middleName, lastName, secondLastName, email, birthDate, gender, selectedCountry, countryCode, city, password, confirmPassword, height, description } = this.registerForm.value;
    const selectedHobbies = this.hobbies.filter(x => x.selected).map(x => {
      return x.id;
    });
    const body = {
      firstName,
      middleName,
      lastName,
      secondLastName,
      email,
      birthDate,
      gender,
      country: selectedCountry,
      countryCode,
      city,
      password,
      confirmPassword,
      height,
      description,
      hobbies: selectedHobbies,
      images: this.images

    };
    this.saving = true;
    this.authUserSerive.registerUser(body).subscribe(data => {
      const { title, description, type } = data;
      
      Swal.fire(title, description, type);
      this.router.navigate(["dashboard/login"]);
      this.saving = false;

    }, error => {
      this.saving = false;
      const{title, description, type}=error.error;
      Swal.fire(title, description, type);
    })
  }
  verifyExistsUser() {
    const { email } = this.registerForm.value;
    this.validatingFirstForm=true;
    this.authUserSerive.verifyExistsUser(email).subscribe(data => {
      this.validatingFirstForm=false;
      const { response }: any = data;
      if (response == 1) {
        this.setFormCounter(1);
      } else {
        this.showMesage("Ya hay un usuario registrado con ese correo electrónico", "error");
      }
    },error=>{
      this.validatingFirstForm=false;
    })
  }
}