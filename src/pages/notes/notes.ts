import { Component } from '@angular/core';
import { Note } from '../../components/note'
import { NotesService } from './service/notes.service'

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {
  myNotes: Note[];

  constructor(private _notesService: NotesService){}
  
  getNotes(){
    this._notesService.getNotes()
    .then(
      result =>{
        this.myNotes = result;
      },
      error => {
        console.log('error');
      }
    )
  }

  ngOnInit(){
    this.getNotes();
  }
}
