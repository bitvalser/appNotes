import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AppState } from '../../redux/app.state';
import { LogOut } from '../../redux/auth/auth.actions';
import { Store } from '@ngrx/store';

import firebase from 'firebase';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
})
export class AccountPage {
  public email: string;
  public count: number;

  constructor(public viewCtrl: ViewController, private store: Store<AppState>) {
    this.email = firebase.auth().currentUser.email;
  }

  public logOut(): void {
    this.store.dispatch(new LogOut());
  }
}
