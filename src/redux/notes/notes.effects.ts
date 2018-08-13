import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { App } from 'ionic-angular';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { NotesAction, AddNote, AddFailed, GoDetail, InitNotes, UpdateNotes, InitNotesLength } from './notes.actions';
import { Observable } from 'rxjs/Observable';
import { NoteDetailPage } from '../../pages/noteDetail/noteDetail.page';
import { NotesService } from '../../core/service/notes.service';
import { AppState } from '../app.state';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class NotesEffects {

  constructor(private actions$: Actions, private notesService: NotesService,
              private app: App, public store: Store<AppState>) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public updateNotes$: Observable<Action> = this.actions$.pipe(
      ofType(NotesAction.ADD_NOTE),
      tap((action: AddNote) => this.notesService.addNote(action.payload)),
      catchError(() => Observable.of(new AddFailed())),
    );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public goDetailNotes$: Observable<Action> = this.actions$.pipe(
      ofType(NotesAction.GO_DETAIL),
      tap((action: GoDetail) => {
        this.app.getActiveNav().push(NoteDetailPage, action.payload);
      }),
      catchError(() => Observable.of({ type: NotesAction.GO_TO_DETAIL_ERROR })),
    );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public initNotesAction$: Observable<Action> = this.actions$.pipe(
    ofType(NotesAction.INIT_NOTES),
    tap((action: InitNotes) => {
      this.notesService.getNotes().on('value', (e) => {
        this.store.dispatch(new UpdateNotes(e.val()));
        // this.stateLoad = false;
      });
    }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public initNotesLengthAction$: Observable<Action> = this.actions$.pipe(
    ofType(NotesAction.INIT_NOTES),
    tap((action: InitNotesLength) => {
      this.notesService.getNotes().on('value', (e) => {
        if (e.val()) {
          this.notesService.setNumber(e.val().length);
        } else {
          this.notesService.setNumber(0);
        }
      });
    }),
  );

}
