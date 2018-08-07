import { Component } from '@angular/core';
import { App, NavController, ViewController } from 'ionic-angular';
import { AuthorizationPage } from '../authorization/authorization.page';

import firebase from 'firebase';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
})
export class AccountPage {
  public email: string;
  public count: number;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public appCtrl: App) {
    this.email = firebase.auth().currentUser.email;
  }

  public logOut(): void {
    firebase.auth().signOut();
    this.appCtrl.getRootNav().push(AuthorizationPage);
  }
}
