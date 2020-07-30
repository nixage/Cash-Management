import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../../service/user/user.service';
import { ISpends } from '../../../interface/finance/finance.interface';
import { userSpendsActionsType, getUserSpendsSuccessActions, userSpendsActions, addUserSpendsSuccessActions, deleteUserSpendsSuccessActions } from './userSpends.actions';
import { addUserSavingsSuccessActions, updateUserSavingsSuccessActions } from '../userSaving/userSavings.actions';

@Injectable()
export class userSpendsEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}

  @Effect()
  getUserSpends() {
    return this.actions$.pipe(
      ofType(userSpendsActionsType.getUserSpends),
      switchMap( () => {
        return this.userService.getUserSpends().pipe(
          map( (spends: ISpends[]) => {
            return new getUserSpendsSuccessActions(spends)
          })
        )
      })
    );
  }

  @Effect()
  addUserSpends() {
    return this.actions$.pipe(
      ofType(userSpendsActionsType.addUserSpends),
      switchMap( (action:userSpendsActions) => {
        return this.userService.addUserSpends(action.payload).pipe(
          map( () => {
            return new addUserSpendsSuccessActions(action.payload)
          })
        )
      })
    );
  }

  @Effect()
  updateUserSpends() {
    return this.actions$.pipe(
      ofType(userSpendsActionsType.updateUserSpends),
      switchMap( (action:userSpendsActions) => {
        return this.userService.updateUserSpends(action.payload.id, action.payload.amount).pipe(
          map( () => {
            return new updateUserSavingsSuccessActions(action.payload)
          })
        )
      })
    );
  }
  
  @Effect()
  deleteUserSpends() {
    return this.actions$.pipe(
      ofType(userSpendsActionsType.deleteUserSpends),
      switchMap( (action: userSpendsActions) => {
        return this.userService.deleteUserSpends(action.payload.id).pipe(
          map( () => {
            return new deleteUserSpendsSuccessActions(action.payload)
          })
        )
      })
    )
  }
}
