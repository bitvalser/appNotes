import { Component, ApplicationRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthorizationPage } from '../pages/authorization/authorization.page';
import { TabsPage } from '../pages/tabs/tabs.page';

import { AppState } from '../redux/app.state';
import { Store } from '@ngrx/store';
import { AlreadyLogin } from '../redux/auth/auth.actions';

import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCpqP2yni8791VWGDmLASHjA2GujzDctis",
  authDomain: "anton-51782.firebaseapp.com",
  databaseURL: "https://anton-51782.firebaseio.com",
  projectId: "anton-51782",
  storageBucket: "anton-51782.appspot.com",
  messagingSenderId: "890891651047",
};
firebase.initializeApp(config);

@Component({
  templateUrl: 'app.component.html',
})
export class MyApp {
  public rootPage: any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private store: Store<AppState>, private appRef: ApplicationRef) {
    platform.ready().then(() => {
      firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebase.auth().currentUser !== null) {
          this.rootPage = TabsPage;
          this.store.dispatch(new AlreadyLogin(firebaseUser));
          // this.appRef.tick();
        } else {
          this.rootPage = AuthorizationPage;
          this.appRef.tick();
        }

      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
