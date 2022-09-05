import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MainBooksComponent } from './main-books/main-books.component';
import { AnimatedMainComponent } from './animated-main/animated-main.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { RouterModule } from '@angular/router';
import { StripHtmlPipe } from './components/pipeclean.component';
import { SearchIsbnComponent } from './components/search-isbn/search-isbn.component';
import { SearchTitleComponent } from './components/search-title/search-title.component';
import { SearchAuthorComponent } from './components/search-author/search-author.component';
import { MainCardComponent } from './components/main-card/main-card.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MainBooksComponent,
    AnimatedMainComponent,
    StripHtmlPipe,
    ViewBookComponent,
    SearchIsbnComponent,
    SearchTitleComponent,
    SearchAuthorComponent,
    MainCardComponent,
    MyBooksComponent,
    ResetPasswordComponent,
    TermsAndConditionsComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    MainBooksComponent,
    AnimatedMainComponent,
    ViewBookComponent,
    SearchIsbnComponent,
    SearchTitleComponent,
    SearchAuthorComponent,
    MainCardComponent,
    MyBooksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class HomeModule { }

