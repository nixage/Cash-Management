import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// INTERFACE
import {
  ISpendsOptions,
  ISpends,
  ISavings,
} from 'src/app/interface/finance/finance.interface';

// ANIMATIONS
import { inOutAnimation } from 'src/app/animations/animations';

// SERVICES
import { UserService } from '../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';

// NGRX
import { Store, ActionsSubject, select } from '@ngrx/store';
import { UserFinanceBalanceUpdateActions, UserFinanceExpensesUpdateActions, userFinanceActionsType } from '../../state/userFinance/userFinance.actions';
import { ofType } from '@ngrx/effects';
import { wrapperLockActions } from 'src/app/appState/wrapperLock/wrapperLock.actions';
import { updateUserSavingsActions, userSavingsActionsType } from '../../state/userSaving/userSavings.actions';
import { userSpendsActionsType, addUserSpendsActions } from '../../state/userSpends/userSpends.actions';
import { selectUserSavings } from '../../state/userSaving/userSavings.selectors';

// RXJS
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-add-spends',
  templateUrl: './add-spends.component.html',
  styleUrls: ['./add-spends.component.scss'],
  animations: [inOutAnimation],
})
export class AddSpendsComponent implements OnInit,OnDestroy {
  optionsSpends: Array<ISpendsOptions>;

  formAdd: FormGroup;

  updateUserBalanceSub = new Subscription()
  updateUserExpensesSub = new Subscription()
  updateUserSavingsSub = new Subscription()
  addUserSpendsSub = new Subscription()

  public userSavings: ISavings[] = []
  userSavingStore: Observable<ISavings[]> = this.store.pipe(
    select(selectUserSavings)
  )

  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService,
    private store: Store,
    private actionsub: ActionsSubject
  ) {
    this.formAdd = new FormGroup({
      userSavings: new FormControl('', Validators.required),
      optionsSpends: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
    });
  }
  ngOnDestroy(): void {
    this.updateUserBalanceSub.unsubscribe();
    this.updateUserExpensesSub.unsubscribe()
    this.updateUserSavingsSub.unsubscribe();
    this.addUserSpendsSub.unsubscribe()
  }

  ngOnInit(): void {
    this.userService
      .getSpends()
      .subscribe((data: Array<ISpendsOptions>): void => {
        this.optionsSpends = data;
      });
    this.userSavingStore.subscribe( (userSavings:ISavings[]) => {
      this.userSavings = userSavings
    })
    this.store.dispatch( new wrapperLockActions({flag:true}))
  }

  get f() {
    return this.formAdd.controls;
  }

  addSpends(): void {
    if (this.formAdd.invalid) {
      return;
    }
    const spends: ISpends = {
      name: this.formAdd.get('optionsSpends').value,
      img:
        this.formAdd
          .get('optionsSpends')
          .value.toLowerCase()
          .replace(/\s+/, '') + '.png',
      amount: +this.formAdd.get('amount').value,
      savingId: +this.formAdd.get('userSavings').value,
    };
    const sumOfUserSpends =
      this.userService.returnUserAmountSpends() + spends.amount;
    if (sumOfUserSpends > this.userService.returnUserAmountSavings()) {
      this.toastrService.error('Sum of spends is more than savings', 'Error');
      return;
    }

    this.store.dispatch(new addUserSpendsActions(spends))
    this.addUserSpendsSub = this.actionsub.pipe(
      ofType(userSpendsActionsType.addUserSpendsSuccess)
    ).subscribe( () => {
      this.toastrService.success(spends.name + ' add', 'Success');
      this.updateUserSavings();
    }, err => this.closeWithError(err))
  }

  updateUserSavings(): void {
    const amount = +this.formAdd.get('amount').value;
    const userSavingsId = +this.formAdd.get('userSavings').value;
    const oldUserSavingAmount = this.userSavings.find(
      (val) => val.id === userSavingsId
    );
    const newUserSavingsAmount = oldUserSavingAmount.amount - amount;
    this.store.dispatch( new updateUserSavingsActions({id: userSavingsId, amount: newUserSavingsAmount}))
    this.updateUserSavingsSub = this.actionsub.pipe(
      ofType(userSavingsActionsType.updateUserSavingsSuccess)
    ).subscribe( () => {
      this.toastrService.success('Saving Update', 'Success');
      this.updateUserBalance();
    }, (err) => this.closeWithError(err))
  }

  updateUserBalance(): void {
    this.store.dispatch(new UserFinanceBalanceUpdateActions())
    this.updateUserBalanceSub = this.actionsub.pipe(
      ofType(userFinanceActionsType.updateUserBalanceSuccess)
    ).subscribe( () => {
      this.updateUserExpenses()
    })
  }
  updateUserExpenses() {
    this.store.dispatch(new UserFinanceExpensesUpdateActions())
    this.updateUserExpensesSub = this.actionsub.pipe(
      ofType(userFinanceActionsType.updateUserExpensesSuccess)
    ).subscribe( () => {
      this.closePopUp()
    })
  }

  closePopUp(): void {
    this.router.navigate([{ outlets: { popUpAdd: null } }], {
      relativeTo: this.activateRoute.parent,
    });
    this.store.dispatch( new wrapperLockActions({flag:false}))
  }
  closeWithError(err) {
    this.toastrService.error(err.error.msg, 'Error');
    this.closePopUp();
  }
}
