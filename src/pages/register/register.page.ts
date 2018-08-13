import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';

import { Store } from '@ngrx/store';
import { AppState } from '../../redux/app.state';
import { RegisterUser, ErrorAuth, BackToLogin } from '../../redux/auth/auth.actions';
import { Auth } from '../../core/components/Auth';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
})
export class RegisterPage implements OnInit {

  public stateAuth: Observable<Auth>;

  public loginForm: FormGroup = this.builder.group({
    username: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
    ])),
    password: new FormControl('', Validators.compose([
      Validators.minLength(6),
      Validators.required,
    ])),
    confirm_password: new FormControl('', Validators.compose([
      Validators.minLength(6),
      Validators.required,
    ])),
  });

  constructor(private builder: FormBuilder, public alertCtrl: AlertController,
              private store: Store<AppState>) {}

  public showAlert(myTitle: string, subtitle: string): void {
    const alert = this.alertCtrl.create({
      title: myTitle,
      subTitle: subtitle,
      buttons: ['OK'],
    });
    alert.present();
  }

  public async onRegister(): Promise<void> {
    const values = this.loginForm.value;

    if (this.loginForm.invalid) {
      this.store.dispatch(new ErrorAuth({ header: 'Error', error: 'Fill in the form correctly!' }));
    } else if (values.password !== values.confirm_password) {
      this.store.dispatch(new ErrorAuth({ header: 'Error', error: 'Passwords don\'t match!' }));
    } else {
      this.store.dispatch(new RegisterUser({ login: values.username, password: values.password }));
    }
  }

  // tslint:disable-next-line:no-empty
  public backToLogin(): void {
    this.store.dispatch(new BackToLogin());
  }

  public ngOnInit(): void {
    this.stateAuth = this.store.select('authPage', 'auth');
  }

}
