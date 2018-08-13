import { AuthActionUnion, AuthAction } from './auth.actions';

const initialState = {
  auth: {
    login: null,
    password: null,
    loginState: false,
    loading: false,
  },
};

// tslint:disable-next-line:no-empty
export function authReducer(state = initialState, action: AuthActionUnion) {
  switch (action.type) {
    // Login
    case AuthAction.LOGIN_USER:
      return{
        ...state,
        auth: {
          ...state.auth,
          ...action.payload,
          loading: true,
        },
      };
    case AuthAction.LOGIN_FAILED:
      return{
        ...state,
        auth: {
          ...state.auth,
          loading: false,
        },
      };
    case AuthAction.LOGIN_SUCCESS:
      return{
        ...state,
        auth: {
          ...state.auth,
          loginState: true,
          loading: false,
        },
      };
    // Register
    case AuthAction.REGISTER_USER:
      return{
        ...state,
        auth: {
          ...state.auth,
          ...action.payload,
          loading: true,
        },
      };
    case AuthAction.REGISTER_FAILED:
      return{
        ...state,
        auth: {
          ...state.auth,
          loading: false,
        },
      };
    case AuthAction.REGISTER_SUCCESS:
      return{
        ...state,
        auth: {
          ...state.auth,
          loginState: true,
          loading: false,
        },
      };
    // Error
    case AuthAction.ERROR_AUTH:
      return{
        ...state,
        auth: {
          ...state.auth,
          error: action.payload.error,
        },
      };
    case AuthAction.LOG_OUT:
      return{
        ...state,
        auth: {
          ...state.auth,
          loginState: false,
        },
      };
    case AuthAction.ALREADY_LOGIN:
      return{
        ...state,
        auth: {
          ...state.auth,
          loginState: true,
        },
      };
    default:
      return state;
  }
}
