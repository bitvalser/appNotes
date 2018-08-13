import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NoteItem } from './note.component';

@NgModule({
  declarations: [
    NoteItem,
  ],
  exports: [
    NoteItem,
  ],
  imports: [
    IonicPageModule.forChild(NoteItem),
  ],
})
export class NoteItemModule {}
