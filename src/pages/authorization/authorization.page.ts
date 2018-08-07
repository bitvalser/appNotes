import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs.page';
import { RegisterPage } from '../register/register.page';

import { NotesService } from '../notes/service/notes.service';

import firebase from 'firebase';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.page.html',
})
export class AuthorizationPage implements OnInit {

  public stateLoad: boolean = false;

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

  constructor(private builder: FormBuilder, public navCtrl: NavController,
              public alertCtrl: AlertController, private notesService: NotesService) {}

  public showAlert(myTitle: string, subtitle: string): void {
    const alert = this.alertCtrl.create({
      title: myTitle,
      subTitle: subtitle,
      buttons: ['OK'],
    });
    alert.present();
  }

  public foo(): void {
    this.navCtrl.setRoot(TabsPage);
  }

  public onLogin(): void {
    const values = this.loginForm.value;

    if (this.loginForm.invalid) {
      this.showAlert('Error', 'Fill in the form correctly!');
    } else {
      const auth = firebase.auth();
      this.stateLoad = true;

      const promise = auth.signInWithEmailAndPassword(values.username, values.password);
      promise.then(
          (result) => {
            this.stateLoad = false;
            this.notesService.setUserDb(result.user.uid);
            this.navCtrl.setRoot(TabsPage);
          },
          (error) => {
            this.stateLoad = false;
            this.showAlert('Error', error.message);
          });
    }
  }

  public redirectReg(): void {
    this.navCtrl.push(RegisterPage);
  }

  public ngOnInit(): void {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // user login
      }
    });
  }

}
