import { Component } from '@angular/core';

import { AddNotePage } from '../addNote/addNote';
import { NotesPage } from '../notes/notes';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NotesPage;
  tab2Root = AddNotePage;
  tab3Root = AccountPage;

  constructor() {

  }
}
