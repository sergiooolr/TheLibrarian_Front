import { Component, OnInit } from '@angular/core';
import { FormGroup, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { Login } from '../interfaces/registro';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /* email!: string;
  password!: string;*/
  formGrp!: FormGroup;

  loginValidator: Login = {
    email: '',
    password: '',
  };

  constructor(public userService: UsersService, private router: Router, private translate: TranslateService) {
    // Register translation languages
    translate.addLangs(['es', 'en', 'fr', 'de']);
    // Set default language
    translate.setDefaultLang(translate.getBrowserLang()!);
  }

  //Switch language
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    window.scrollTo(8,8);
  }

  login() {

    this.userService
      .postLogin({
        correo: this.loginValidator.email,
        password: this.loginValidator.password,
      })
      .subscribe({
        next: (datos: any) => {

          localStorage.setItem('token', datos.accessToken);
          this.router.navigate(['/']);

        },
        error:(_error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.translate.instant('LOGIN_WRONG_EMAIL_OR_PASSWORD')
          });
        }
      });
  }



  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

  // login() {
  //   const user = {email: this.email, password: this.password};
  //   this.userService.login(user).subscribe( data => {
  //     console.log(data);
  //   });
  // }
}
