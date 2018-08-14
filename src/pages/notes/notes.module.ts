import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NoteItemModule } from './components/note/note.module';
import { NotesPage } from './notes.page';

@NgModule({
  declarations: [
    NotesPage,
  ],
  exports: [
    NotesPage,
  ],
  imports: [
    NoteItemModule,
    IonicPageModule.forChild(NotesPage),
  ],
})
export class NotesPageModule {}
