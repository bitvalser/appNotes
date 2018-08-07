import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNotePage } from './addNote.page';

@NgModule({
  declarations: [
    AddNotePage,
  ],
  exports: [
    AddNotePage,
  ],
  imports: [
    IonicPageModule.forChild(AddNotePage),
  ],
})
export class AddNotePageModule {}
