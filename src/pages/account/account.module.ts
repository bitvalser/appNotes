import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account.page';

@NgModule({
  declarations: [
    AccountPage,
  ],
  exports: [
    AccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountPage),
  ],
})
export class AccountPageModule {}
