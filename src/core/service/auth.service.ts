import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';

import firebase from 'firebase';

@Injectable()
export class AuthService {
  private auth = firebase.auth();

  constructor(private notesService: NotesService) {}

  public loginUser(login: string, password: string): Observable<firebase.auth.UserCredential> {
    const login$ = Observable.fromPromise(this.auth.signInWithEmailAndPassword(login, password));
    return login$;
  }

  public registerUser(login: string, password: string): Observable<firebase.auth.UserCredential> {
    const register$ = Observable.fromPromise(this.auth.createUserWithEmailAndPassword(login, password));
    return register$;
  }

  public alreadyLogin(user: firebase.User): void {
    this.notesService.setUserDb(user.uid);
  }

  public logOut(): void {
    this.auth.signOut();
  }
}
