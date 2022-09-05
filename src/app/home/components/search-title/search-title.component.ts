import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../../interfaces/books';
import { BookService } from '../../services/book.service';
import { SharedDataService } from '../../services/shared-data.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-title',
  templateUrl: './search-title.component.html',
  styleUrls: ['./search-title.component.css'],
})
export class SearchTitleComponent implements OnInit {
  books: Item[] = [];

  title!: string;
  subscription!: Subscription;

  constructor(
    private sharedTitle: SharedDataService,
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
    this.subscription = this.sharedTitle.currentMessage.subscribe(
      (message) => (this.title = message)
    );

    this.activatedRoute.params
      .pipe(switchMap(({ title }) => this.bookService.searchBookByTitle(title)))
      .subscribe({
        next: (books) => {


          if (books != null) {




            let resultado: number = books.items.length;

            if (resultado == 0) {
              Swal.fire({
                icon: 'error',
                title: this.translate.instant('ALERT_POR_TITLE'),
                confirmButtonText: 'Ok!',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/']);
                }
              });
            } else {
              this.books = books.items;
            }

          }
          else {

            Swal.fire({
              icon: 'error',
              title: this.translate.instant('ALERT_POR_TITLE'),
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
            title: this.translate.instant('ALERT_POR_TITLE'),
            confirmButtonText: 'Ok!',
          }).then((result2) => {
            if (result2.isConfirmed) {
              this.router.navigate(['/']);
            }
          });
        },
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
