import { createReducer, on } from '@ngrx/store';
import { userState } from '../user/user.state';
import { loginSuccess, logout, setProfileData } from './user.action';

const _userReducer = createReducer(
  userState,
  on(loginSuccess, (state, action) => {
    return { ...state, userInfo: action.userInfo };
  }),
  on(setProfileData, (state, action) => {
    return { ...state, profileData: action.profileData };
  }),
  on(logout, () => userState)
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
