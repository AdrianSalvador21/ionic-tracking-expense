import * as fromAuth from '../actions/auth.actions';


export interface AuthState {
  userData: any;
}

const initialStatus: AuthState = {
  userData: {}
};

export function userReducer( state = initialStatus, action: fromAuth.actions ): any {

  switch ( action.type ) {
    case fromAuth.SET_USER:
      return {
        ...state,
        userData: {...state.userData, ...action.userData}
      };

    default:
      return state;
  }
}
