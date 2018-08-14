import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RegisterPage } from '../../pages/register/register.page';
import { AuthorizationPage } from '../../pages/authorization/authorization.page';
import { AlertController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { NoteDetailPage } from '../../pages/noteDetail/noteDetail.page';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { AppState } from '../app.state';

import {
  RedirectRegister,
  BackToLogin,
  GoDetail,
  Redirect,
  NavAction,
} from './navigation.actions';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class NavEffects {

  constructor(private actions$: Actions, public store: Store<AppState>,
              public alertCtrl: AlertController, private app: App) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public redirectAction$: Observable<Action> = this.actions$.pipe(
      ofType(NavAction.REDIRECT),
      tap((action: Redirect) => {
        this.app.getActiveNav().push(action.payload);
      }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public redirectRegisterAction$: Observable<Action> = this.actions$.pipe(
      ofType(NavAction.REDIRECT_REGISTER),
      tap((action: RedirectRegister) => {
        this.app.getActiveNav().setRoot(RegisterPage);
      }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public backtoLoginAction$: Observable<Action> = this.actions$.pipe(
      ofType(NavAction.BACK_TO_LOGIN),
      tap((action: BackToLogin) => {
        this.app.getActiveNav().setRoot(AuthorizationPage);
      }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public goDetailNotes$: Observable<Action> = this.actions$.pipe(
      ofType(NavAction.GO_DETAIL),
      tap((action: GoDetail) => {
        this.app.getActiveNav().push(NoteDetailPage, action.payload);
      }),
      catchError(() => Observable.of({ type: NavAction.GO_TO_DETAIL_ERROR })),
    );

}
