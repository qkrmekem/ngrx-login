import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth.actions';
import { AppState, selectAccessToken, selectError } from '../../store/auth.selectors';
import { State } from '../../store/state.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  id = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  accessToken!:any;
  error!:any;

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.store.select(selectAccessToken).subscribe(accessToken => {
      console.log('accessToken 구독', accessToken);
      this.accessToken = accessToken; // 여기서 accessToken을 컴포넌트의 상태나 프로퍼티에 저장
    });

    this.store.select(selectError).subscribe(error => {
      console.log('selectError 구독', error);
      this.error = JSON.stringify(error); // 여기서 error를 컴포넌트의 상태나 프로퍼티에 저장
    });
  }
  
  login(){
    const id = this.id.value;
    const password = this.password.value;
    if(id && password){
      this.store.dispatch(login({ id, password }));
    }

  }
}
