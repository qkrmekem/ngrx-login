import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth.actions';
import { selectAccessToken, selectError } from '../../store/auth.selectors';
import { State } from '../../store/state.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  id = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  constructor(
    private store: Store<State>
  ){}

  ngOnInit(): void {
    this.store.select(selectAccessToken).subscribe(accessToken => {
      console.log('selectAccessToken 호출', accessToken);
    })

    this.store.select(selectError).subscribe(error => {
      console.log('selectError 호출', error);
      
    })
  }
  
  login(){
    const id = this.id.value;
    const password = this.password.value;
    if(id && password){
      this.store.dispatch(login({ id, password }));
    }

  }
}
