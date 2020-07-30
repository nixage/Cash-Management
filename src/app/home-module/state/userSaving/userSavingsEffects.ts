import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../../service/user/user.service';
import { ISavings } from '../../../interface/finance/finance.interface';
import {
  userSavingsActionsType,
  getUserSavingsSuccessActions,
  userSavingsActions,
  addUserSavingsSuccessActions,
  updateUserSavingsSuccessActions,
  deleteUserSavingsSuccessActions,
} from './userSavings.actions';

@Injectable()
export class userSavingsEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}

  @Effect()
  getUserSavings() {
    return this.actions$.pipe(
      ofType(userSavingsActionsType.getUserSavings),
      switchMap(() => {
        return this.userService.getUserSavings().pipe(
          map((data: Array<ISavings>) => {
            if (data) {
              return new getUserSavingsSuccessActions(data);
            }
          })
        );
      })
    );
  }

  @Effect()
  addUserSavings() {
    return this.actions$.pipe(
      ofType(userSavingsActionsType.addUserSavings),
      switchMap((action: userSavingsActions) => {
        return this.userService.addUserSavings(action.payload).pipe(
          map(() => {
            return new addUserSavingsSuccessActions(action.payload);
          })
        );
      })
    );
  }

  @Effect()
  updateUserSavings() {
    return this.actions$.pipe(
      ofType(userSavingsActionsType.updateUserSavings),
      switchMap((action: userSavingsActions) => {
        return this.userService
          .updateUserSavings(action.payload.id, action.payload.amount)
          .pipe(
            map(() => {
              return new updateUserSavingsSuccessActions(action.payload);
            })
          );
      })
    );
  }

  @Effect()
  deleteUserSavings() {
    return this.actions$.pipe(
      ofType(userSavingsActionsType.deletUserSavings),
      switchMap((action: userSavingsActions) => {
        return this.userService.deleteUserSavings(action.payload.id).pipe(
          map(() => {
            return new deleteUserSavingsSuccessActions(action.payload);
          })
        );
      })
    );
  }
}
