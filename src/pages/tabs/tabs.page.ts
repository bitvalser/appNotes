import { Component } from '@angular/core';

import { AddNotePage } from '../addNote/addNote.page';
import { NotesPage } from '../notes/notes.page';
import { AccountPage } from '../account/account.page';

import { AppState } from '../../redux/app.state';
import { Store } from '@ngrx/store';
import { InitNotesLength } from '../../redux/notes/notes.actions';

@Component({
  templateUrl: 'tabs.page.html',
})
export class TabsPage {

  public tab1Root = NotesPage;
  public tab2Root = AddNotePage;
  public tab3Root = AccountPage;

  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new InitNotesLength());
  }
}
