import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserModel } from '../models/user.model';

const getUserState = createFeatureSelector<UserModel>('user');

export const getUserId = createSelector(getUserState, (state) => {
  return state.userInfo?.id ? state.userInfo?.id : state.profileData?.id;
});

export const getProfileData = createSelector(getUserState, (state) => {
  return state.profileData;
});
