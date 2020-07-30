import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ISideBar, sideBarNode } from './sideBar.reducer';


export const selectSideBar = createFeatureSelector<ISideBar>(sideBarNode);
export const selectSideBarFlag = createSelector(
  selectSideBar,
  (state:ISideBar) => state.sideBarOpen
)