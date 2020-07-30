import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// INTERFACE
import {
  ISavingsOptions,
  ISavings,
} from 'src/app/interface/finance/finance.interface';
import { inOutAnimation } from 'src/app/animations/animations';

// SERVICE
import { UserService } from '../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';

// RXJS
import { Observable, Subscription } from 'rxjs';

// NGRX
import { Store, select, ActionsSubject } from '@ngrx/store';
import { selectUserIncome } from '../../state/userFinance/userFinance.selectors';
import {
  UserFinanceBalanceUpdateActions,
  userFinanceActionsType,
} from '../../state/userFinance/userFinance.actions';
import {
  addUserSavingsActions,
  userSavingsActionsType,
} from '../../state/userSaving/userSavings.actions';
import { ofType } from '@ngrx/effects';
import { wrapperLockActions } from 'src/app/appState/wrapperLock/wrapperLock.actions';

@Component({
  selector: 'app-add-savings',
  templateUrl: './add-savings.component.html',
  styleUrls: ['./add-savings.component.scss'],
  animations: [inOutAnimation],
})
export class AddSavingsComponent implements OnInit, OnDestroy {
  optionsSavings: Array<ISavingsOptions>;
  userIncome: number = 0;
  userIncomeStore: Observable<number> = this.store.pipe(
    select(selectUserIncome)
  );
  formAdd: FormGroup;

  addUserSavingsSub = new Subscription();
  updateUserBalanceSub = new Subscription()

  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService,
    private store: Store,
    private actionsub: ActionsSubject
  ) {
    this.formAdd = new FormGroup({
      options: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
    });
  }
  ngOnDestroy(): void {
   this.addUserSavingsSub.unsubscribe()
   this.updateUserBalanceSub.unsubscribe()
  }
  ngOnInit(): void {
    this.userIncomeStore.subscribe((income) => (this.userIncome = income));
    this.userService
      .getSavings()
      .subscribe((data: Array<ISavingsOptions>): void => {
        this.optionsSavings = data;
      });
    this.store.dispatch( new wrapperLockActions({flag:true}))
  }

  get f() {
    return this.formAdd.controls;
  }

  addSavings(): void {
    if (this.formAdd.invalid) {
      return;
    }
    const savings: ISavings = {
      name: this.formAdd.get('options').value.toLowerCase().replace(/\s+/, ''),
      img:
        this.formAdd.get('options').value +
        '.png'.toLowerCase().replace(/\s+/, ''),
      amount: +this.formAdd.get('amount').value,
    };
    const sumOfUserSavings =
      this.userService.returnUserAmountSavings() + savings.amount;
    if (sumOfUserSavings > this.userIncome) {
      this.toastrService.error(
        'Sum of savings is more than income for this mounth'
      );
      return;
    }

    this.store.dispatch(new addUserSavingsActions(savings));
    this.addUserSavingsSub = this.actionsub
      .pipe(ofType(userSavingsActionsType.addUserSavingsSuccess))
      .subscribe(() => {
        this.updateUserBalance();
      });
  }

  updateUserBalance() {
    this.store.dispatch(new UserFinanceBalanceUpdateActions());
    this.updateUserBalanceSub = this.actionsub
      .pipe(ofType(userFinanceActionsType.updateUserBalanceSuccess))
      .subscribe(() => {
        this.closePopUp();
      });
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
