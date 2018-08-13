import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoteDetailPage } from './noteDetail.page';

@NgModule({
  declarations: [
    NoteDetailPage,
  ],
  exports: [
    NoteDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NoteDetailPage),
  ],
})
export class NoteDetailPageModule {}
