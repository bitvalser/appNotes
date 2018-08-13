import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';

import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.state';
import { LoginUser, ErrorAuth, RedirectRegister } from '../../redux/auth/auth.actions';
import { Auth } from '../../core/components/Auth';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.page.html',
})
export class AuthorizationPage implements OnInit {

  public stateAuth: Observable<Auth>;

  public loginForm: FormGroup = this.builder.group({
    username: ['',
      Validators.compose([
        Validators.required,
        Validators.email,
      ]),
    ],
    password: ['',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ]),
    ],
  });

  constructor(private builder: FormBuilder, private store: Store<AppState>,
              public alertCtrl: AlertController) {}

  public async onLogin(): Promise<void> {
    const values = this.loginForm.value;

    if (this.loginForm.invalid) {
      this.store.dispatch(new ErrorAuth({ header: 'Error', error: 'Fill in the form correctly!' }));
    } else {
      this.store.dispatch(new LoginUser({ login: values.username, password: values.password }));
    }
  }

  public redirectReg(): void {
    this.store.dispatch(new RedirectRegister());
  }

  public ngOnInit(): void {
    this.stateAuth = this.store.select('authPage', 'auth');
  }

}
