import { Component, ElementRef, ViewChild } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NotesService } from '../notes/service/notes.service';
import { Note } from '../../components/note';
import { LocalNotifications } from '@ionic-native/local-notifications';

declare const google: any;

@Component({
  selector: 'app-add-note',
  templateUrl: 'addNote.page.html',
})
export class AddNotePage {
  public myPhoto: string = null;
  public myText: string;
  public myHeader: string;
  public myMap: Object;

  public isMap: boolean = false;

  public btnEnabled: boolean = false;

  @ViewChild("map")
  public mapRef: ElementRef;

  constructor(private notesService: NotesService, private camera: Camera,
              private localNotifications: LocalNotifications) { }

  public textChange(): void {
    if ((this.myText.length > 1) && (this.myHeader.length > 1)) {
      this.btnEnabled = true;
    } else {
      this.btnEnabled = false;
    }
  }

  public addNote(): void {
    const newNote: Note = {
      header: this.myHeader,
      text: this.myText,
      image: this.myPhoto,
      map: this.myMap,
    };

    this.myHeader = "";
    this.myText = "";
    this.myPhoto = null;
    this.myMap = null;
    this.isMap = false;

    this.notesService.addNote(newNote);

    this.localNotifications.schedule({
      text: "Your record has been added!",
      trigger: { at: new Date(new Date().getTime() + 5000) },
      led: "FF0000",
      sound: null,
    });
  }

  public deleteImg(): void {
    this.myPhoto = null;
  }

  public takePhoto(): void {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
        this.myPhoto = "data:image/jpeg;base64," + imageData;
      },
      (err) => {
        console.log("error");
      });
  }

  public getImage(): void {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.myPhoto = "data:image/jpeg;base64," + imageData;
      },
      (err) => {
        console.log("error");
      });
  }

  public initMap(): void {
    const location = { lat: -34.397, lng: 150.644 };

    const options = {
      center: location,
      zoom: 16,
    };

    this.myMap = location;

    const map = new google.maps.Map(document.getElementById("map"), options);
    const marker = this.addMarker(location, map);
    map.addListener("click", (e) => {
      this.myMap = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      marker.setPosition(e.latLng);
    });
  }

  public addMarker(pos, myMap): any {
    return new google.maps.Marker({
      position: pos,
      map: myMap,
    });
  }

  public addMap(): void {
    this.isMap = true;
    this.initMap();
  }

  public deleteMap(): void {
    this.myMap = null;
    this.isMap = false;
  }

}
