import { Note } from '../core/components/Note';
import { Auth } from '../core/components/Auth';

// tslint:disable-next-line:interface-name
export interface AppState {
  notesPage: {
    notes: Note[],
  };
  authPage: {
    auth: Auth,
  };
}
