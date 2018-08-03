import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthorizationPage } from '../pages/authorization/authorization';

import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCpqP2yni8791VWGDmLASHjA2GujzDctis",
  authDomain: "anton-51782.firebaseapp.com",
  databaseURL: "https://anton-51782.firebaseio.com",
  projectId: "anton-51782",
  storageBucket: "anton-51782.appspot.com",
  messagingSenderId: "890891651047"
};
firebase.initializeApp(config);

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AuthorizationPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
