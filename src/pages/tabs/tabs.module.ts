import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs.page';

import { AddNotePageModule } from '../addNote/addNote.module';
import { AccountPageModule } from '../account/account.module';
import { NoteDetailPageModule } from '../noteDetail/noteDetail.module';
import { NotesPageModule } from '../notes/notes.module';

@NgModule({
  declarations: [
    TabsPage,
  ],
  exports: [
    TabsPage,
  ],
  imports: [
    AddNotePageModule,
    AccountPageModule,
    NoteDetailPageModule,
    NotesPageModule,
    IonicPageModule.forChild(TabsPage),
  ],
})
export class TabsPageModule {}
