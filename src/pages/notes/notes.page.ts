import { Component } from '@angular/core';
import { Note } from '../../components/note';
import { NotesService } from './service/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.page.html',
})
export class NotesPage {
  public myNotes: Note[] = null;
  public stateLoad: boolean = true;

  constructor(private notesService: NotesService) {}

  public getNotes(): void {
    this.notesService.getNotes().on('value', (e) => {
      this.myNotes = e.val();
      this.myNotes.reverse();
      this.stateLoad = false;
    });
  }

  public ngOnInit(): void {
    this.getNotes();
  }
}
