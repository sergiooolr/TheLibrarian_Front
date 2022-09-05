import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { Item } from '../../interfaces/books';
import { BookService } from '../../services/book.service';
import { SharedDataService } from '../../services/shared-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-author',
  templateUrl: './search-author.component.html',
  styleUrls: ['./search-author.component.css'],
})
export class SearchAuthorComponent implements OnInit {
  books: Item[] = [];

  author!: string;
  subscription!: Subscription;

  constructor(
    private sharedAuthor: SharedDataService,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
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
    this.subscription = this.sharedAuthor.currentMessage.subscribe(
      (message) => (this.author = message)
    );
    this.activatedRoute.params
      .pipe(
        switchMap(({ author }) => this.bookService.buscarLibroPorAuthor(author))
      )
      .subscribe({
        next: (books) => {
          if (books != null) {
            console.log('estoy aqui');

            let resultado: number = books.items.length;

            if (resultado == 0) {
              Swal.fire({
                icon: 'error',
                title: this.translate.instant('ALERT_POR_AUTHOR'),
                confirmButtonText: 'Ok!',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/']);
                }
              });
            } else {
              this.books = books.items;
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: this.translate.instant('ALERT_POR_AUTHOR'),
              confirmButtonText: 'Ok!',
            }).then((result2) => {
              if (result2.isConfirmed) {
                this.router.navigate(['/']);
              }
            });
          }
        },
        error: (_err) => {
          Swal.fire({
            icon: 'error',
            title: this.translate.instant('ALERT_POR_AUTHOR'),
            confirmButtonText: 'Ok!',
          }).then((result2) => {
            if (result2.isConfirmed) {
              this.router.navigate(['/']);
            }
          });
        },
      });
  }
}
