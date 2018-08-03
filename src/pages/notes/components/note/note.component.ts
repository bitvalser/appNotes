import { Component, Input } from '@angular/core';
import { Note } from '../../../../components/note'
import { NoteDetailPage } from '../../../note-detail/note-detail';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-note',
  templateUrl: 'note.component.html'
})
export class NoteItem{
    @Input()
    note: Note;
    @Input()
    id: number;

    constructor(public navCtrl: NavController){}

    goDetail(){
      this.navCtrl.push(NoteDetailPage, this.note);
    }
}