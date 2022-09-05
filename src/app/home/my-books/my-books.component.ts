import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BookService } from '../services/book.service';
import { ReserveService } from '../services/reserve.service';
import { UsersService } from '../services/users.service';
import { Books } from '../interfaces/books';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css'],
})
export class MyBooksComponent implements OnInit {
  idReserva: number = 0;

  userById = {
    id_user: 0,
  };
  book: any[] = [];
  books2: any[] = [];

  nuevaReserva: any = {
    id_usuario: 0,
    id_book: 0,
    is_reservado: false,
  };

  constructor(
    private reserveService: ReserveService,
    private usersService: UsersService,
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
    if (this.usersService.isLogged()) {
      this.obtenerIdUsuario();
    } else {
      return;
    }
  }

  obtenerIdUsuario() {
    this.usersService.getCurrentUser().subscribe({
      next: (datos) => {
        this.userById.id_user = <number>datos;

        this.getReserve(this.userById.id_user);
      },
    });
  }

  getReserve(id: number) {
    this.reserveService.reservedByUser(id).subscribe((data) => {

      if (data.length > 0) {
        this.book = data;

      } else {
         this.book = [];
      }
    });
  }

  updateReserve(reserva: any) {
    Swal.fire({
      title: this.translate.instant('MY_BOOKS_RETURN_BUTTON_ALERT_TEXT'),
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: this.translate.instant('MY_BOOKS_ADD_ALERT_CANCEL_BUTTON_TEXT'),
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant('MY_BOOKS_RETURN_ALERT_TEXT'),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(this.translate.instant('MY_BOOKS_RETURNED_ALERT_TEXT'), this.translate.instant('MY_BOOKS_RETURNED_ALERT_SUBTEXT'), 'success');

        this.idReserva = reserva.id;
        this.nuevaReserva.id_usuario = reserva.id_usuario;
        this.nuevaReserva.id_book = reserva.id_book;

        this.reserveService
          .updateReserve(this.nuevaReserva, this.idReserva)
          .subscribe((_datos) => {
            // TODO document why this arrow function is empty
            this.getReserve(reserva.id_usuario);
          });

      }
    });
  }


  noDIsponible(){
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos',
      text: 'De momento este libro no esta disponible. Por favor intentalo mas tarde.'
    })
  }
}
