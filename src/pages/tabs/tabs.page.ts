import { Component } from '@angular/core';

import { AddNotePage } from '../addNote/addNote.page';
import { NotesPage } from '../notes/notes.page';
import { AccountPage } from '../account/account.page';

import { NotesService } from '../notes/service/notes.service';

@Component({
  templateUrl: 'tabs.page.html',
})
export class TabsPage {

  public tab1Root = NotesPage;
  public tab2Root = AddNotePage;
  public tab3Root = AccountPage;

  constructor(private notesService: NotesService) {}

  public getLength(): void {
    this.notesService.getNotes().on('value', (e) => {
      if (e.val()) {
        this.notesService.setNumber(e.val().length);
      } else { this.notesService.setNumber(0); }
    });
  }

  public ngOnInit(): void {
    this.getLength();
  }
}
