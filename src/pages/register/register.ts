import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NavController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import firebase from 'firebase'

@Component({
  selector: 'app-register',
  templateUrl: './register.html'
})
export class RegisterPage implements OnInit {

  constructor(private builder: FormBuilder, public navCtrl: NavController, public alertCtrl: AlertController) {}

  state_load: boolean = false;

  loginForm: FormGroup = this.builder.group({
    username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email, 
    ])),
    password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
    ])),
    confirm_password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
    ]))
  });

  showAlert(title, subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  onRegister(){
    const values = this.loginForm.value;

    if (this.loginForm.invalid) {
        this.showAlert('Error', 'Fill in the form correctly!');
    }
    else if(values.password !== values.confirm_password){
        this.showAlert('Error', 'Passwords do not match!');
    }
    else{      
        const auth = firebase.auth();
        this.state_load = true;

        const promise = auth.createUserWithEmailAndPassword(values.username, values.password);
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


  backToLogin(){
    this.navCtrl.pop();
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
        }
    })   
  }

}