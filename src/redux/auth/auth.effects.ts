import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RegisterPage } from '../../pages/register/register.page';
import { AuthorizationPage } from '../../pages/authorization/authorization.page';
import { AlertController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/service/auth.service';
import { NotesService } from '../../core/service/notes.service';
import { tap, catchError } from 'rxjs/operators';
import { AppState } from '../app.state';

import {
  LoginUser,
  ErrorAuth,
  RedirectRegister,
  LogOut,
  AuthAction,
  LoginFaild,
  LoginSuccess,
  RegisterFailed,
  RegisterSuccess,
  BackToLogin,
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
  @Effect({ dispatch: false })
  public loginAction$: Observable<Action> = this.actions$.pipe(
      ofType(AuthAction.LOGIN_USER),
      tap((action: LoginUser) => {
        this.authService.loginUser(action.payload.login, action.payload.password).subscribe(
            (response: firebase.auth.UserCredential) => {
              this.notesSevice.setUserDb(response.user.uid);
              this.store.dispatch(new LoginSuccess());
              // this.app.getActiveNav().setRoot(TabsPage);
            },
            (err: any) => {
              this.store.dispatch(new LoginFaild());
              this.store.dispatch(new ErrorAuth({ header: 'Error', error: err.message }));
            },
        );
      }),
      catchError(() => Observable.of(new LoginFaild())),
    );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public registerAction$: Observable<Action> = this.actions$.pipe(
    ofType(AuthAction.REGISTER_USER),
    tap((action: LoginUser) => {
      this.authService.registerUser(action.payload.login, action.payload.password).subscribe(
          (response: firebase.auth.UserCredential) => {
            this.notesSevice.setUserDb(response.user.uid);
            this.store.dispatch(new RegisterSuccess());
            // this.app.getActiveNav().setRoot(TabsPage);
          },
          (err: any) => {
            this.store.dispatch(new RegisterFailed());
            this.store.dispatch(new ErrorAuth({ header: 'Error', error: err.message }));
          },
      );
    }),
    catchError(() => Observable.of(new RegisterFailed())),
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
  public redirectRegisterAction$: Observable<Action> = this.actions$.pipe(
      ofType(AuthAction.REDIRECT_REGISTER),
      tap((action: RedirectRegister) => {
        this.app.getActiveNav().setRoot(RegisterPage);
      }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public backtoLoginAction$: Observable<Action> = this.actions$.pipe(
      ofType(AuthAction.BACK_TO_LOGIN),
      tap((action: BackToLogin) => {
        this.app.getActiveNav().setRoot(AuthorizationPage);
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
  @Effect({ dispatch: false })
  public alreadyLoginAction$: Observable<Action> = this.actions$.pipe(
      ofType(AuthAction.ALREADY_LOGIN),
      tap((action: AlreadyLogin) => {
        this.authService.alreadyLogin(action.payload);
        // this.app.getRootNav().setRoot(TabsPage);
      }),
  );

}
