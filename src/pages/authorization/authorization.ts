import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

import firebase from 'firebase'

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.html'
})
export class AuthorizationPage implements OnInit {

  constructor(private builder: FormBuilder, public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  state_load: boolean = false;

  loginForm: FormGroup = this.builder.group({
    username: ['',
      Validators.compose([
        Validators.required,
        Validators.email
      ])
    ],
    password: ['',
      Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])
    ]
  });

  showAlert(title, subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  onLogin(){
    const values = this.loginForm.value;

    if (this.loginForm.invalid) {
      this.showAlert('Error', 'Fill in the form correctly!');
    }
    else{
      const auth = firebase.auth();
      this.state_load = true;

      const promise = auth.signInWithEmailAndPassword(values.username, values.password);
      promise.then(
          result =>{
              this.state_load = false;
              this.navCtrl.setRoot(TabsPage);
          },
          error =>{
              this.state_load = false;
              this.showAlert('Error', error.message);
          }
      )      
    }
  }

  redirectReg(){
    this.navCtrl.push(RegisterPage);
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
      }
    }) 
  }

}
