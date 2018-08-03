import { Component} from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NotesService } from '../notes/service/notes.service';
import { Note } from '../../components/note';
import { LocalNotifications } from '@ionic-native/local-notifications';

// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker
// } from '@ionic-native/google-maps';

@Component({
  selector: 'app-add-note',
  templateUrl: 'addNote.html'
})
export class AddNotePage {
  myphoto:any;
  mytext: string;
  myheader: string;
  mymap: any = null;

  btnEnbaled: boolean = false;

  constructor(private _notesService: NotesService, private camera: Camera, private localNotifications: LocalNotifications){}

  textChange(){
    if((this.mytext.length > 1) && (this.myheader.length > 1)){
      this.btnEnbaled = true;
    }
    else{
      this.btnEnbaled = false;
    }
  }

  addNote(){
    let newNote: Note = {
      header: this.myheader,
      text: this.mytext, 
      image: this.myphoto, 
      map: null
    }
    this.myheader = '';
    this.mytext = '';
    this.myphoto = null;
    this._notesService.addNote(newNote);

    this.localNotifications.schedule({
      text: 'Your record has been added!',
      trigger: {at: new Date(new Date().getTime() + 5000)},
      led: 'FF0000',
      sound: null
   });
  }

  deleteImg(){
    this.myphoto = null;
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then(imageData => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, err => {
      // Handle error
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  // map: GoogleMap;

  // ionViewDidLoad() {
  //   this.loadMap();
  // }

  // loadMap() {

  //   let mapOptions: GoogleMapOptions = {
  //     camera: {
  //        target: {
  //          lat: 43.0741904,
  //          lng: -89.3809802
  //        },
  //        zoom: 18,
  //        tilt: 30
  //      }
  //   };

  //   this.map = GoogleMaps.create('map_canvas', mapOptions);

  //   let marker: Marker = this.map.addMarkerSync({
  //     title: 'Ionic',
  //     icon: 'blue',
  //     animation: 'DROP',
  //     position: {
  //       lat: 43.0741904,
  //       lng: -89.3809802
  //     }
  //   });
  //   // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
  //   //   alert('clicked');
  //   // });
  // }

}
