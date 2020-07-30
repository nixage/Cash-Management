import { SideBarActions, sideBarActionsType } from './sideBar.actions';


export const sideBarNode = 'sideBar';

export interface ISideBar {
  sideBarOpen: boolean
}

const initialState: ISideBar = {
  sideBarOpen: false
}

export const sideBarReducer = (state = initialState, action: SideBarActions) => {
  switch (action.type) {
    case sideBarActionsType.sideBarOpen:
      return {
        ...state,
        sideBarOpen: action.payload.flag
      }
    default:
      return state
  }
}