import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userSavingsNode, IUserSavingsStore } from './userSavings.reducer';

const selectUserSavingsFeature = createFeatureSelector<IUserSavingsStore>(userSavingsNode);

export const selectUserSavings = createSelector(
  selectUserSavingsFeature,
  (state) => state.savings
)

export const selectUserSavingBydId = (id: number) => createSelector(
  selectUserSavingsFeature,
  state => state.savings.find(val => val.id === id)
)

