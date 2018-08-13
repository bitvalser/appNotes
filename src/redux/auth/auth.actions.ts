import { Action } from '@ngrx/store';

// tslint:disable-next-line:no-namespace
export namespace AuthAction {
    export const LOGIN_USER = 'LOGIN_USER';
    export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    export const LOGIN_FAILED = 'LOGIN_FAILED';

    export const ERROR_AUTH = 'ERROR_AUTH';

    export const REGISTER_USER = 'REGISTER_USER';
    export const REGISTER_FAILED = 'REGISTER_FAILED';
    export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

    export const LOG_OUT = 'LOG_OUT';

    export const REDIRECT_REGISTER = 'REDIRECT_REGISTER';
    export const BACK_TO_LOGIN = 'BACK_TO_LOGIN';

    export const ALREADY_LOGIN = 'ALREADY_LOGIN';
}

export class LoginUser implements Action {
  public readonly type = AuthAction.LOGIN_USER;

  constructor(public payload: {login: string, password: string}) {}
}

// tslint:disable-next-line:max-classes-per-file
export class LoginFaild implements Action {
  public readonly type = AuthAction.LOGIN_FAILED;
}

// tslint:disable-next-line:max-classes-per-file
export class LoginSuccess implements Action {
  public readonly type = AuthAction.LOGIN_SUCCESS;
}

// tslint:disable-next-line:max-classes-per-file
export class ErrorAuth implements Action {
  public readonly type = AuthAction.ERROR_AUTH;

  constructor(public payload: { header: string,  error: string }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class RegisterUser implements Action {
  public readonly type = AuthAction.REGISTER_USER;

  constructor(public payload: {login: string, password: string}) {}
}

// tslint:disable-next-line:max-classes-per-file
export class RegisterFailed implements Action {
  public readonly type = AuthAction.REGISTER_FAILED;
}

// tslint:disable-next-line:max-classes-per-file
export class RegisterSuccess implements Action {
  public readonly type = AuthAction.REGISTER_SUCCESS;
}

// tslint:disable-next-line:max-classes-per-file
export class LogOut implements Action {
  public readonly type = AuthAction.LOG_OUT;
}

// tslint:disable-next-line:max-classes-per-file
export class RedirectRegister implements Action {
  public readonly type = AuthAction.REDIRECT_REGISTER;
}

// tslint:disable-next-line:max-classes-per-file
export class BackToLogin implements Action {
  public readonly type = AuthAction.BACK_TO_LOGIN;
}

// tslint:disable-next-line:max-classes-per-file
export class AlreadyLogin implements Action {
  public readonly type = AuthAction.ALREADY_LOGIN;

  constructor(public payload: firebase.User) {}
}

export type AuthActionUnion = LoginUser         |
                            RegisterUser        |
                            LogOut              |
                            LoginFaild          |
                            LoginSuccess        |
                            ErrorAuth           |
                            RegisterFailed      |
                            RegisterSuccess     |
                            RedirectRegister    |
                            AlreadyLogin;
