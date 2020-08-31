import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserInfoStore, userInfoNode } from './userInfo.reducer';

const selectUserInfoFeature = createFeatureSelector<IUserInfoStore>(userInfoNode)

export const selectUserInfo = createSelector(
  selectUserInfoFeature,
  (state) => state.user
) 