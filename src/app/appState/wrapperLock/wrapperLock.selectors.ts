import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IWrapper, wrapperNode } from './wrapperLock.reducer';

export const selectWrapper = createFeatureSelector<IWrapper>(wrapperNode)
export const selectWrapperFlag = createSelector(
  selectWrapper,
  (state:IWrapper) => state.wrapperOpen
)