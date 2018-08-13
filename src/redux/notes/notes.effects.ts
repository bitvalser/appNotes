import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { App } from 'ionic-angular';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { NotesAction, AddNote, AddFailed, InitNotes, UpdateNotes } from './notes.actions';
import { Observable } from 'rxjs/Observable';
import { NotesService } from '../../core/service/notes.service';
import { AppState } from '../app.state';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { tap, catchError, map, switchMap, mergeMap } from 'rxjs/operators';

@Injectable()
export class NotesEffects {

  constructor(private actions$: Actions, private notesService: NotesService,
              private app: App, public store: Store<AppState>) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  public updateNotes$: Observable<Action> = this.actions$.pipe(
      ofType(NotesAction.ADD_NOTE),
      mergeMap((action: AddNote) => this.notesService.addNote(action.payload)),
      map(() => ({ type: NotesAction.ADD_SUCCESS })),
      catchError(() => Observable.of(new AddFailed())),
    );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public initNotesAction$: Observable<Action> = this.actions$.pipe(
    ofType(NotesAction.INIT_NOTES),
    switchMap((action: InitNotes) => this.notesService.notes()),
    map((value: any) => new UpdateNotes(value)),
  );

  // tslint:disable-next-line:member-ordering
  // @Effect({ dispatch: false })
  // public initNotesLengthAction$: Observable<Action> = this.actions$.pipe(
  //   ofType(NotesAction.INIT_NOTES),
  //   tap((action: InitNotesLength) => {
  //     this.notesService.getDataBase().on('value', (e) => {
  //       if (e.val()) {
  //         this.notesService.setLength(e.val().length);
  //       } else {
  //         this.notesService.setLength(0);
  //       }
  //     });
  //   }),
  // );

}
