import { Component, Input } from '@angular/core';
import { Note } from '../../../../core/components/Note';
import { GoDetail } from '../../../../redux/navigation/navigation.actions';
import { AppState } from '../../../../redux/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-note',
  templateUrl: 'note.component.html',
})
export class NoteItem {
  @Input()
    public note: Note;
  @Input()
    public id: number;

  constructor(private store: Store<AppState>) {}

  public goDetail(): void {
    this.store.dispatch(new GoDetail(this.note));
  }
}
