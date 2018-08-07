import { Component, Input } from '@angular/core';
import { Note } from '../../../../components/note';
import { NoteDetailPage } from '../../../noteDetail/noteDetail.page';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-note',
  templateUrl: 'note.component.html',
})
export class NoteItem {
  @Input()
    public note: Note;
  @Input()
    public id: number;

  constructor(public navCtrl: NavController) {}

  public goDetail(): void {
    this.navCtrl.push(NoteDetailPage, this.note);
  }
}
