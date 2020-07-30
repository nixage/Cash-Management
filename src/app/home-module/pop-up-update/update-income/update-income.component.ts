import { Component, OnInit, OnDestroy } from '@angular/core';

// ANIMATION
import { inOutAnimation } from 'src/app/animations/animations';

// SERVICES
import { ToastrService } from 'ngx-toastr';

// NGRX
import { Store, ActionsSubject } from '@ngrx/store';
import { UserFinanceIncomeUpdateActions, userFinanceActionsType } from '../../state/userFinance/userFinance.actions'
import { ofType } from '@ngrx/effects';
import { wrapperLockActions } from 'src/app/appState/wrapperLock/wrapperLock.actions';

// RXJS
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.scss'],
  animations: [inOutAnimation],
})
export class UpdateIncomeComponent implements OnInit,OnDestroy {
  flag:boolean = false;

  updateUserIncomeSub = new Subscription()

  constructor(
    private toastrService: ToastrService,
    private store: Store,
    private actionsub: ActionsSubject
  ) {
  }
  ngOnDestroy(): void {
    this.updateUserIncomeSub.unsubscribe()
  }
  ngOnInit(): void {
    this.store.dispatch( new wrapperLockActions({flag:true}))
  }

  updateIncome(value: string): void {
    const income: number = +value
    this.store.dispatch(new UserFinanceIncomeUpdateActions({amount:income}))
    this.updateUserIncomeSub = this.actionsub.pipe(
      ofType(userFinanceActionsType.updateUserIncomeSuccess)
    ).subscribe( () => {
      this.flag = true;
    })
  }
  showError(err): void {
    this.toastrService.error(err.error.msg, 'Error');
  }
}
