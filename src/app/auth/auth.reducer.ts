import * as authActions from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initState: State = {
  isAuthenticated: false
};

export function authReducer(state = initState, action: authActions.AuthActions) {
  switch (action.type) {
    case authActions.SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case authActions.SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
