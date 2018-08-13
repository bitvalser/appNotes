import { Note } from '../../core/components/Note';
import { Action } from '@ngrx/store';

// tslint:disable-next-line:no-namespace
export namespace NotesAction {
    export const UPDATE_NOTES = 'UPDATE_NOTES';
    export const ADD_NOTE = 'ADD_NOTE';
    export const ADD_FAILED = 'ADD_FAILED';

    export const GO_DETAIL = 'GO_DETAIL';
    export const GO_TO_DETAIL_ERROR = 'GO_TO_DETAIL_ERROR';

    export const INIT_NOTES = 'INIT_NOTES';
    export const INIT_NOTES_LENGTH = 'INIT_NOTES_LENGTH';
}

export class UpdateNotes implements Action {
  public readonly type = NotesAction.UPDATE_NOTES;

  constructor(public payload: Note[]) {}
}

// tslint:disable-next-line:max-classes-per-file
export class AddNote implements Action {
  public readonly type = NotesAction.ADD_NOTE;

  constructor(public payload: Note) {}
}

// tslint:disable-next-line:max-classes-per-file
export class AddFailed implements Action {
  public readonly type = NotesAction.ADD_FAILED;
}

// tslint:disable-next-line:max-classes-per-file
export class GoDetail implements Action {
  public readonly type = NotesAction.GO_DETAIL;

  constructor(public payload: Note) {}
}

// tslint:disable-next-line:max-classes-per-file
export class InitNotes implements Action {
  public readonly type = NotesAction.INIT_NOTES;
}

// tslint:disable-next-line:max-classes-per-file
export class InitNotesLength implements Action {
  public readonly type = NotesAction.INIT_NOTES_LENGTH;
}

export type NotesActionUnion = UpdateNotes      |
                              AddNote           |
                              GoDetail          |
                              AddFailed         |
                              InitNotes;
