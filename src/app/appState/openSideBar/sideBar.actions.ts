import { Action } from '@ngrx/store';


export enum sideBarActionsType {
  sideBarOpen = '[SIDE_BAR] open'
}

export class sideBarOpenActions implements Action {
  readonly type = sideBarActionsType.sideBarOpen
  constructor(public payload: {flag:boolean}){}
}

export type SideBarActions = sideBarOpenActions