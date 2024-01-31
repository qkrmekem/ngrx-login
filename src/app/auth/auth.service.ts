import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000/member'

  constructor(
    private http: HttpClient
  ) { }

  login( param: {id: string, password: string} ){
    console.log('로그인 서비스 호출');

    return this.http.post<{result: string}>(this.baseUrl+'/login', param );
  }

  register( user: User ){
    console.log('회원가입 서비스 호출');
    
    return this.http.post<{result: string}>( this.baseUrl+'/signup', user );
  }
}
