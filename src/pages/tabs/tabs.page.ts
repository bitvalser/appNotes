import { Component } from '@angular/core';
import { AddNotePage } from '../addNote/addNote.page';
import { NotesPage } from '../notes/notes.page';
import { AccountPage } from '../account/account.page';

@Component({
  templateUrl: 'tabs.page.html',
})
export class TabsPage {

  public tab1Root = NotesPage;
  public tab2Root = AddNotePage;
  public tab3Root = AccountPage;

  public ngOnInit(): void {
    // this.store.dispatch(new InitNotesLength());
  }
}
