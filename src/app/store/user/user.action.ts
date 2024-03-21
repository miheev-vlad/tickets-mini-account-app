import { createAction, props } from '@ngrx/store';
import { ILoginData } from 'src/app/types/loginData.interface';
import { IUser } from 'src/app/types/user.interface';

export const LOGIN_START = '[auth] login start';
export const LOGIN_SUCCESS = '[auth] login success';
export const LOGOUT = '[auth] logout';

export const GET_USER = '[user] get user';
export const UPDATE_USER = '[user] update user';

export const SET_PROFILE_DATA = '[profile] set profile data';

export const loginStart = createAction(
  LOGIN_START,
  props<{ loginData: ILoginData }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ userInfo: IUser }>()
);

export const logout = createAction(LOGOUT);

export const getUser = createAction(GET_USER, props<{ id: string }>());

export const setProfileData = createAction(
  SET_PROFILE_DATA,
  props<{ profileData: Omit<IUser, 'password'> }>()
);

export const updateUser = createAction(
  UPDATE_USER,
  props<{ id: string; updateData: Partial<IUser> }>()
);
