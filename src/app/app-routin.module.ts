import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchAuthorComponent } from './home/components/search-author/search-author.component';
import { SearchIsbnComponent } from './home/components/search-isbn/search-isbn.component';
import { SearchTitleComponent } from './home/components/search-title/search-title.component';
import { TermsAndConditionsComponent } from './home/components/terms-and-conditions/terms-and-conditions.component';
import { LoginComponent } from './home/login/login.component';
import { MainBooksComponent } from './home/main-books/main-books.component';
import { MyBooksComponent } from './home/my-books/my-books.component';
import { RegisterComponent } from './home/register/register.component';
import { ResetPasswordComponent } from './home/reset-password/reset-password.component';
import { ViewBookComponent } from './home/view-book/view-book.component';

const APP_ROUTES: Routes = [

  {path: '', component: MainBooksComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ResetPasswordComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'vista/:id', component: ViewBookComponent},
  {path: 'isbn/:isbn', component: SearchIsbnComponent},
  {path: 'title/:title', component: SearchTitleComponent},
  {path: 'mybooks', component: MyBooksComponent},
  {path: 'author/:author', component: SearchAuthorComponent},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: '**', redirectTo: ''}

]

@NgModule({
  imports:[
    RouterModule.forRoot( APP_ROUTES,{scrollPositionRestoration: 'enabled'} )
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule{}
