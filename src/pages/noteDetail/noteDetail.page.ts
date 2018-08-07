import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Note } from '../../components/note';

declare const google: any;

@Component({
  selector: 'app-note-detail',
  templateUrl: 'noteDetail.page.html',
})
export class NoteDetailPage {
  public note: Note;
  public isMap: boolean = false;

  @ViewChild('mapDetail')
  public mapRef: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.note = navParams.data;
    if (this.note.map) {
      this.isMap = true;
    }
  }

  public initMap(): void {
    const options = {
      center: this.note.map,
      zoom: 16,
    };

    const map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarker(this.note.map, map);
  }

  public addMarker(pos, myMap): any {
    return new google.maps.Marker({
      position: pos,
      map: myMap,
    });
  }

  public ionViewDidLoad(): void {
    if (this.isMap) {
      this.initMap();
    }
  }

}
