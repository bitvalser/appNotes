import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';
import { AuthorizationPage } from '../authorization/authorization';

import firebase from 'firebase'

@Component({
  selector: 'app-account',
  templateUrl: 'account.html'
})
export class AccountPage {
    email: string;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public appCtrl: App){
        this.email = firebase.auth().currentUser.email;
    }

    logOut(){
        firebase.auth().signOut();
        this.appCtrl.getRootNav().push(AuthorizationPage);
    }
}