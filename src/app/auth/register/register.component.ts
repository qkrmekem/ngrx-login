import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, props } from '@ngrx/store';
import { AppState, selectAccessToken, selectError } from '../../store/auth.selectors';
import { signUp } from '../../store/auth.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  accessToken!: any;
  error!: any;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.store.select(selectAccessToken).subscribe(accessToken => {
      console.log('accessToken 구독', accessToken);
      this.accessToken = accessToken; // 여기서 accessToken을 컴포넌트의 상태나 프로퍼티에 저장
    });

    this.store.select(selectError).subscribe(error => {
      console.log('selectError 구독', error);
      this.error = JSON.stringify(error); // 여기서 error를 컴포넌트의 상태나 프로퍼티에 저장
    });

  }

  onSubmit() {

    if (this.registerForm.valid) {
      const user: User = this.makeUser()
      console.log(this.registerForm.value);
      this.store.dispatch(signUp({user}));
    }
  }

  makeUser(): User{
    const id = this.registerForm.get('id')?.value;
    const password = this.registerForm.get('password')?.value;
    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;

    return {
      id,
      password,
      name,
      email
    };
  }

}
