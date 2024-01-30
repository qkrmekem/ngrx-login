import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000/auth/login'

  constructor(
    private http: HttpClient
  ) { }

  login( param: {id: string, password: string} ){
    console.log('로그인 서비스 호출');

    return this.http.post<{result: string}>(this.baseUrl, param );
  }

  register( user: User ){
    return this.http.post<string>( this.baseUrl, user );
  }
}
