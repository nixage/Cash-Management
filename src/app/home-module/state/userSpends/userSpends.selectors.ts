import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserSpendsStore, userSpendsNode } from './userSpends.reducer';


const selectUserSpendsFeature = createFeatureSelector<IUserSpendsStore>(userSpendsNode);

export const selectUserSpends = createSelector(
  selectUserSpendsFeature,
  state => state.spends
)

export const selectUserSpendsById = (id: number) => createSelector(
  selectUserSpendsFeature,
  state => state.spends.find(val => val.id === id)
)