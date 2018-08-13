import { Action } from '@ngrx/store';
import { Note } from '../../core/components/Note';

// tslint:disable-next-line:no-namespace
export namespace NavAction {
    export const REDIRECT_REGISTER = 'REDIRECT_REGISTER';
    export const BACK_TO_LOGIN = 'BACK_TO_LOGIN';

    export const GO_DETAIL = 'GO_DETAIL';
    export const GO_TO_DETAIL_ERROR = 'GO_TO_DETAIL_ERROR';
}

// tslint:disable-next-line:max-classes-per-file
export class RedirectRegister implements Action {
  public readonly type = NavAction.REDIRECT_REGISTER;
}

// tslint:disable-next-line:max-classes-per-file
export class BackToLogin implements Action {
  public readonly type = NavAction.BACK_TO_LOGIN;
}

// tslint:disable-next-line:max-classes-per-file
export class GoDetail implements Action {
  public readonly type = NavAction.GO_DETAIL;

  constructor(public payload: Note) {}
}

export type NavigationActionUnion = RedirectRegister        |
                                    GoDetail                |
                                    BackToLogin;
