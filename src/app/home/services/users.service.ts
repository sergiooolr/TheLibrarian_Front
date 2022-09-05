import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChangePassword } from '../interfaces/registro';

const HOST = 'https://thelibrarianback.herokuapp.com/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private changePassword = environment.urlChangePassword;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*",
      
    } )
  };

  constructor(private http: HttpClient) {}

  postLogin(usuario: any) {
    return this.http.post(`${HOST}/login`, usuario, this.httpOptions);
  }

  logOut() {
    localStorage.removeItem('token');
  }

  isLogged() {
    return localStorage.getItem('token') != null;
  }

  getCurrentUser() {
    return this.http.get(`${HOST}/getCurrentUser`, this.httpOptions);
  }

  putChangePassword(changePasswordDTO: ChangePassword): Observable<any> {

   

    return this.http.put(`${this.changePassword}/${changePasswordDTO.email}/${changePasswordDTO.password}/${changePasswordDTO.newPassword}`, changePasswordDTO, this.httpOptions);


  }


}
