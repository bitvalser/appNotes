import { Injectable } from '@angular/core';
import { Note } from '../../../components/note';

import firebase from 'firebase';

@Injectable()
export class NotesService {
  private length: number;
  private db: any;

  constructor() {
    this.db = null;
    this.length = null;
  }

  public setUserDb(uid: string): void {
    this.db = firebase.database().ref().child(uid);
  }

  public setNumber(value: number): void {
    this.length = value;
  }

  public getLength(): number {
    return this.length;
  }

  public getNotes(): any {
    return this.db;
  }

  public addNote(note: Note): void {
    if ((this.length !== null) && this.db) {
      console.log(this.length);
      this.db.child(this.length.toString()).set(note);
    }
  }
}
