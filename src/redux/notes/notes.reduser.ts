import { NotesActionUnion, NotesAction } from './notes.actions';

const initialState = {
  notes: [],
  keys: null,
  isLoading: true,
};

// tslint:disable-next-line:no-empty
export function notesReduser(state = initialState, action: NotesActionUnion) {
  switch (action.type) {
    case NotesAction.UPDATE_NOTES:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
