import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from '../services/users.service';
import { ChangePassword } from '../interfaces/registro';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  changePasswordDTO: ChangePassword = {
    email: '',
    password: '',
    newPassword: ''
  };


  constructor(private router: Router, public changePassword: UsersService, public translate: TranslateService) {
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
    // TODO document why this method 'ngOnInit' is empty
  }



  changePassworCallService(){


     this.changePassword.putChangePassword(this.changePasswordDTO).subscribe({
      next: (_datos: any) => {

        Swal.fire(
          this.translate.instant('CHANGE_PASSWORD_ALERT_TITLE'),
          this.translate.instant('CHANGE_PASSWORD_ALERT_TEXT'),
          'success'
        )

        this.router.navigate(['/login']);


      },
      error:(_error) => {

        Swal.fire({
          icon: 'error',
          title: this.translate.instant('CHANGE_PASSWORD_ALERT_ERROR_TEXT'),
        });
      }
    })




  }

}
