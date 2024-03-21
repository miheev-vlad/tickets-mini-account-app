import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginStart, logout } from '../../store/user/user.action';
import { ILoginData } from 'src/app/types/loginData.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private builder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    localStorage.clear();
    this.store.dispatch(logout());
  }

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  login() {
    if (this.loginForm.valid) {
      const loginData: ILoginData = {
        username: this.loginForm.value.username as string,
        password: this.loginForm.value.password as string,
      };
      this.store.dispatch(loginStart({ loginData: loginData }));
    }
  }
}
