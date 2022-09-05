import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Registro } from '../interfaces/registro';
import { RegistroService } from '../services/registro.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  nuevoRegistro: Registro = {
    nombre: '',
    correo: '',
    password: '',
    check: false
  };

  confirmPassword!: string;

  constructor(
    public registroSer: RegistroService,
    private router: Router,
    public translate: TranslateService
  ) {
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

  crearRegistro() {
    this.registroSer.postUsuario(this.nuevoRegistro).subscribe({

      next: () => {
        Swal.fire({
          icon: 'success',
          title: this.translate.instant('REGISTER_SUCCES_ALERT_TITLE'),
          text: this.translate.instant('REGISTER_SUCCES_ALERT_TEXT'),
        }).then((_result) => {
          this.router.navigate(['/login']);
        });
      },
      error: (_err) => {
        Swal.fire({
          icon: 'error',
          title: this.translate.instant('ALERT_REGISTER'),
          confirmButtonText: 'Ok!',
        })
      },
    });
  }

  //Funcion para la validacion de los formularios
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }
}
