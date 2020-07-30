import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// INTERFACE
import {
  ISavings,
  ISpends,
} from 'src/app/interface/finance/finance.interface';

// SERVICE
import { UserService } from '../service/user/user.service';
import { ToastrService } from 'ngx-toastr';

// NGRX
import { Store, select } from '@ngrx/store';
import { selectUserIncome, selectUserBalance } from '../state/userFinance/userFinance.selectors';
import { selectUserSavings } from '../state/userSaving/userSavings.selectors';
import { selectUserSpends } from '../state/userSpends/userSpends.selectors';

// RXJS
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public userBalance: number = 0;
  userBalanceStore: Observable<number> = this.store.pipe(
    select(selectUserBalance)
  )
  public userIncome: number = 0;
  userIncomeStore: Observable<number> = this.store.pipe(
    select(selectUserIncome)
  )
  public userSavings: ISavings[] = []
  userSavingStore: Observable<ISavings[]> = this.store.pipe(
    select(selectUserSavings)
  )
  public userSpends: ISpends[] = [];
  userSpendsStore: Observable<ISavings[]> = this.store.pipe(
    select(selectUserSpends)
  )

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public store: Store
  ) {}

  ngOnInit(): void {
    this.userIncomeStore.subscribe( (income:number) => {
      this.userIncome = income
    })
    this.userBalanceStore.subscribe( (balance:number) => {
      this.userBalance = balance
    })
    this.userSavingStore.subscribe( (savings:ISavings[]) => {
      this.userSavings = [...savings]
    })
    this.userSpendsStore.subscribe( (spends: ISpends[]) => {
      this.userSpends = [...spends]
    })
  }

  addSavings() {
    if (this.userService.returnUserAmountSavings() >= this.userIncome) {
      this.toastr.error(
        'Your sum of savings is more that your income',
        'Error'
      );
      return;
    }
    this.router.navigate([{ outlets: { popUpAdd: 'addSavings' } }], {
      relativeTo: this.activatedRoute,
    });
  }
  updateSavings(savings: ISavings) {
    this.router.navigate([{ outlets: { popUpUpdate: 'updateSavings' } }], {
      queryParams: { id: savings.id, prop: 'savings' },
      relativeTo: this.activatedRoute,
    });
  }

  addSpends() {
    if (this.userService.returnUserAmountSpends() >= this.userBalance) {
      this.toastr.error(
        'Your sum of spends is more that your balance',
        'Error'
      );
      return;
    }
    this.router.navigate([{ outlets: { popUpAdd: 'addSpends' } }], {
      relativeTo: this.activatedRoute,
    });
  }
  updateSpends(spends: ISpends) {
    this.router.navigate([{ outlets: { popUpUpdate: 'updateSpends' } }], {
      queryParams: { id: spends.id, prop: 'spends' },
      relativeTo: this.activatedRoute,
    });
  }

  updateIncome() {
    this.router.navigate([{ outlets: { popUpUpdate: 'updateIncome' } }], {
      relativeTo: this.activatedRoute,
    });
  }
}
