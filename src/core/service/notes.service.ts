import { Injectable } from '@angular/core';
import { Note } from '../components/Note';
import { Observable } from 'rxjs';

import firebase from 'firebase';

@Injectable()
export class NotesService {
  private db: any;

  constructor() {
    this.db = null;
  }

  public setUserDb(uid: string): Observable<any> {
    return Observable.create((observer) => {
      this.db = firebase.database().ref().child(uid);
      observer.next(this.db);
      observer.complete();
    });
  }

  public notes(): Observable<Note[]> {
    return Observable.create((observer) => {
      this.db.on('value', (e) => {
        let keysArray = [];
        if (e.val()) {
          keysArray = Object.keys(e.val());
        }
        observer.next({ notes: e.val(), keys: keysArray });
      });
    });
  }

  public getDataBase(): any {
    return this.db;
  }

  public addNote(note: Note): Observable<any> {
    return Observable.create((observer) => {
      if (this.db) {
        const key = this.db.push().key;
        this.db.child(key).set(note);
      }
      observer.next(note);
      observer.complete();
    });
  }
}
