import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { VolumeInfoBD } from '../interfaces/addbookbd';
import { Item } from '../interfaces/books';
import { BookService } from '../services/book.service';
import { ReserveService } from '../services/reserve.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css'],
})

export class ViewBookComponent implements OnInit {
  idUsuario: number = 0;
  librosDelUsuario!: number;

  bookVer!: Item;
  bookAdd: VolumeInfoBD = {
    title: '',
    publishedDate: '',
    isbn: '',
    description: '',
    imageLinks: '',
    pageCount: 0,
    language: '',
    previewLink: '',
  };

  reserveAdd: any = {
    id_book: 0,
    id_usuario: 0,
    is_reservado: true,
  };

  botonVerMas = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    private bookService: BookService,
    private reserveService: ReserveService,
    private usersService: UsersService,
    private route: Router
  ) {
    // Register translation languages
    translate.addLangs(['es', 'en', 'fr']);
    // Set default language
    translate.setDefaultLang(translate.getBrowserLang()!);
  }

  //Switch language
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.bookService.buscarLibroPorId(id)))
      .subscribe((book) => {
        this.bookVer = book;

        this.bookAdd.title = this.bookVer.volumeInfo.title;
        this.bookAdd.publishedDate = this.bookVer.volumeInfo.publishedDate;
        this.bookAdd.isbn =
          this.bookVer.volumeInfo.industryIdentifiers[0].identifier;
        this.bookAdd.description = this.bookVer.volumeInfo.description.slice(
          0,
          249
        );
        this.bookAdd.imageLinks =
          this.bookVer.volumeInfo.imageLinks.smallThumbnail.slice(0, 249);
        this.bookAdd.pageCount = this.bookVer.volumeInfo.pageCount;
        this.bookAdd.language = this.bookVer.volumeInfo.language;
        this.bookAdd.previewLink = this.bookVer.volumeInfo.previewLink;
      });

    if (this.usersService.isLogged()) {
      this.obtenerUsuario();
    } else {
      return;
    }
  }

  addBookDB() {
    if (!this.usersService.isLogged()) {
      Swal.fire({
        title: this.translate.instant('MY_BOOKS_ADD_BUTTON_NOT_LOGGED_TEXT'),
        text: this.translate.instant('MY_BOOKS_ADD_BUTTON_NOT_LOGGED_SUBTEXT'),
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: this.translate.instant(
          'MY_BOOKS_ADD_ALERT_CANCEL_BUTTON_TEXT'
        ),
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.translate.instant(
          'MY_BOOKS_ADD_ALERT_LOGIN_BUTTON_TEXT'
        ),
      }).then((result) => {
        if (result.isConfirmed) {
          this.route.navigate(['/login']);
        }
      });
    } else if (this.librosDelUsuario >= 3) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.translate.instant('MY_BOOKS_ADD_ALERT_REACHED_LIMIT_TEXT'),
      });
    } else {
      Swal.fire({
        title: this.translate.instant('MY_BOOKS_ADD_ALERT_BUTTON_LOGGED_TEXT'),
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: this.translate.instant(
          'MY_BOOKS_ADD_ALERT_CANCEL_BUTTON_TEXT'
        ),
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.translate.instant(
          'MY_BOOKS_ADD_ALERT_BUTTON_LOGGED_CONFIRM_TEXT'
        ),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            this.translate.instant('MY_BOOKS_ADD_LOGGED_CONFIRM_TEXT'),
            this.translate.instant('MY_BOOKS_ADD_LOGGED_CONFIRM_SUBTEXT'),
            'success'
          );
          this.bookService.addBookBD(this.bookAdd).subscribe({
            next: (datos) => {
              this.getQuery(datos.isbn);
            },
          });
        }
      });
    }
  }

  obtenerUsuario() {
    this.usersService.getCurrentUser().subscribe({
      next: (datos) => {
        this.idUsuario = <number>datos;

        this.reserveAdd.id_usuario = this.idUsuario;

        this.getReserve();
      },
      error: (_err) => {
        /* TODO document why this method 'error' is empty */
      }
    });
  }

  getQuery(isbn: string) {
    this.bookService.buscarLibroPorIsbnBD(isbn).subscribe((books) => {

      this.reserveAdd.id_book = books.id_book;

      this.addReserve(this.reserveAdd);
    });
  }

  addReserve(reserva: any) {
    this.reserveService.addReserve(reserva).subscribe((_reserveDB: any) => {
      // TODO document why this arrow function is empty
    });
  }

  getReserve() {
    this.reserveService.reservedByUser(this.idUsuario).subscribe((data) => {
      this.librosDelUsuario = data.length;
    });
  }

  CambiarValorBoton(){
    this.botonVerMas = !this.botonVerMas;
  }

}
