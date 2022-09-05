import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registro } from '../interfaces/registro';

const HOST = "https://thelibrarianback.herokuapp.com/auth/registro"

@Injectable({
  providedIn: 'root'
})


export class RegistroService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*",   
    } )
  };


  postUsuario(registro: Registro){

    return this.http.post(`${HOST}`,registro, this.httpOptions);
  }
  
}
