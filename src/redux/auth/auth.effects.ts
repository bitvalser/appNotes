import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RegisterPage } from '../../pages/register/register.page';
import { AuthorizationPage } from '../../pages/authorization/authorization.page';
import { AlertController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/service/auth.service';
import { NotesService } from '../../core/service/notes.service';
import { tap, catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { AppState } from '../app.state';

import {
  LoginUser,
  ErrorAuth,
  LogOut,
  AuthAction,
  LoginFaild,
  LoginSuccess,
  RegisterUser,
  RegisterFailed,
  RegisterSuccess,
  AlreadyLogin,
} from './auth.actions';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthService,
              private notesSevice: NotesService, public store: Store<AppState>,
              public alertCtrl: AlertController, private app: App) {}

  public showAlert(myTitle: string, subtitle: string): void {
    const alert = this.alertCtrl.create({
      title: myTitle,
      subTitle: subtitle,
      buttons: ['OK'],
    });
    alert.present();
  }

  // tslint:disable-next-line:member-ordering
  @Effect()
  public loginAction$: Observable<Action> = this.actions$.pipe(
      ofType(AuthAction.LOGIN_USER),
      switchMap((action: LoginUser) =>
        this.authService.loginUser(action.payload.login, action.payload.password)
          .map(() => new LoginSuccess())
          .catch((err: any) => Observable.of(new LoginFaild({ error: err.message }))),
      ),
    );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public registerAction$: Observable<Action> = this.actions$.pipe(
    ofType(AuthAction.REGISTER_USER),
    switchMap((action: RegisterUser) =>
        this.authService.registerUser(action.payload.login, action.payload.password)
          .map(() => new RegisterSuccess())
          .catch((err: any) => Observable.of(new RegisterFailed({ error: err.message }))),
      ),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public errorAuthAction$: Observable<Action> = this.actions$.pipe(
    ofType(AuthAction.LOGIN_FAILED, AuthAction.REGISTER_FAILED),
    map((action: LoginFaild | RegisterFailed) => new ErrorAuth({ header: 'Error', error: action.payload.error })),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public errorAction$: Observable<Action> = this.actions$.pipe(
      ofType(AuthAction.ERROR_AUTH),
      tap((action: ErrorAuth) => {
        this.showAlert(action.payload.header, action.payload.error);
      }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public logOutAction$: Observable<Action> = this.actions$.pipe(
      ofType(AuthAction.LOG_OUT),
      tap((action: LogOut) => {
        this.authService.logOut();
        // this.app.getRootNav().setRoot(AuthorizationPage);
      }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public alreadyLoginAction$: Observable<Action> = this.actions$.pipe(
      ofType(AuthAction.ALREADY_LOGIN),
      mergeMap((action: AlreadyLogin) => this.notesSevice.setUserDb(action.payload.uid)),
      map(() => ({ type: AuthAction.SET_DB })),
      catchError(() => Observable.of({ type: AuthAction.SET_DB_FAILED })),
  );

}
