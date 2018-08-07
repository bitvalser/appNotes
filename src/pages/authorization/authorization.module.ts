import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorizationPage } from './authorization.page';

@NgModule({
  declarations: [
    AuthorizationPage,
  ],
  exports: [
    AuthorizationPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorizationPage),
  ],
})
export class AuthorizationPageModule {}
