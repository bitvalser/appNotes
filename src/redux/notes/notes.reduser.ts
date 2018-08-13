import { NotesActionUnion, NotesAction } from './notes.actions';

const initialState = {
  notes: [],
  isLoading: true,
};

// tslint:disable-next-line:no-empty
export function notesReduser(state = initialState, action: NotesActionUnion) {
  switch (action.type) {
    case NotesAction.UPDATE_NOTES:
      return {
        ...state,
        notes: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
