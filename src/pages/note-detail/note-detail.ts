import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from '../../components/note'

/**
 * Generated class for the NoteDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'app-note-detail',
  templateUrl: 'note-detail.html',
})
export class NoteDetailPage {
  note: Note;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.note = navParams.data;
  }
}
