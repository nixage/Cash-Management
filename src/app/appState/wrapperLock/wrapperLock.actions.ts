import { Action } from '@ngrx/store';


export enum wrapperActionsType {
  wrapperLock = '[WRAPPER] lock'
}

export class wrapperLockActions implements Action {
  readonly type = wrapperActionsType.wrapperLock
  constructor(public payload: {flag: boolean}){}
}

export type wrapperActions = wrapperLockActions
