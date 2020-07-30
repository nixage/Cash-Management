import { wrapperActions, wrapperActionsType } from './wrapperLock.actions'

export const wrapperNode = 'wrapper'

export interface IWrapper{
  wrapperOpen: boolean
}

const initialState: IWrapper = {
  wrapperOpen: false
}

export const wrapperReducer = (state = initialState, action: wrapperActions) => {
  switch(action.type) {
    case wrapperActionsType.wrapperLock:
      return{
        ...state,
        wrapperOpen: action.payload.flag
      }
    default:
      return {
        ...state
      }
  }
}