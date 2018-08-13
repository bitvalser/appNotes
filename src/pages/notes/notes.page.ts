import { Component } from '@angular/core';
import { Notes } from '../../core/components/Note';
import { AppState } from '../../redux/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { InitNotes } from '../../redux/notes/notes.actions';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.page.html',
})
export class NotesPage {

  public notesState: Observable<Notes>;

  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.notesState = this.store.select('notesPage');
    this.store.dispatch(new InitNotes());
  }
}
