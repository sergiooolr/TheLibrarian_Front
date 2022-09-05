import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../interfaces/books';
import { BookService } from '../services/book.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-main-books',
  templateUrl: './main-books.component.html',
  styleUrls: ['./main-books.component.css'],
})
export class MainBooksComponent implements OnInit {
  books: Item[] = [];

  constructor(private bookService: BookService,
              private userS: UsersService) {}

  ngOnInit(): void {

    if (this.userS.isLogged()) {
      this.getHistory();
    } else {
      this.getBooks();
    }
  }

  getBooks() {
      this.bookService.getRandomBooks().subscribe({
        next: (data) => {
          this.books = data.items;
          console.log(this.books);


        },
        error: (err) => {
          console.error(err.errorMessage);
        }
      });

  }

  getHistory(){
    this.bookService.obtenerHistorial().subscribe({
      next: (data) => {
        this.books = data.items;
      },
      error: (_err) => {
        // TODO document why this method 'error' is empty
      }
    });
  }
}
