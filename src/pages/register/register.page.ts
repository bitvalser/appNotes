import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';

import { NotesService } from '../notes/service/notes.service';

import { TabsPage } from '../tabs/tabs.page';

import firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
})
export class RegisterPage implements OnInit {

  public stateLoad: boolean = false;

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

  public onRegister(): void {
    const values = this.loginForm.value;

    if (this.loginForm.invalid) {
      this.showAlert('Error', 'Fill in the form correctly!');
    } else if (values.password !== values.confirm_password) {
      this.showAlert('Error', 'Passwords do not match!');
    } else {
      const auth = firebase.auth();
      this.stateLoad = true;

      const promise = auth.createUserWithEmailAndPassword(values.username, values.password);
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

  public backToLogin(): void {
    this.navCtrl.pop();
  }

  public ngOnInit(): void {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // user login
      }
    });
  }

}
