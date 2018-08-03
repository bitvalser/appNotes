import {Injectable} from '@angular/core'
import {NOTES} from '../mock.notes'

@Injectable()
export class NotesService{
    getNotes() {
        return Promise.resolve(NOTES);
    };
    addNote(note){
        NOTES.push(note);
    }
}