import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

// NGRX
import { Store, select } from '@ngrx/store';
import { getUserFinanceActions } from '../state/userFinance/userFinance.actions';
import { getUserSavingsActions } from '../state/userSaving/userSavings.actions';
import { getUserSpendsActions } from '../state/userSpends/userSpends.actions';

// RXJS
import { Subject, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { selectSideBarFlag } from 'src/app/appState/openSideBar/sideBar.selectores';
import { sideBarOpenActions } from 'src/app/appState/openSideBar/sideBar.actions';
import { wrapperLockActions } from 'src/app/appState/wrapperLock/wrapperLock.actions';
import { getUserInfoActions } from '../state/userInfo/userInfo.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  sideBarOpen:Subject<boolean> = new BehaviorSubject<boolean>(false)
  sideBarStore: Observable<boolean> = this.store.pipe(
    select(selectSideBarFlag)
  )
  sideBarStoreSub: Subscription = new Subscription()

  constructor(public store: Store) { }

  ngOnDestroy(): void {
    this.sideBarStoreSub.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.sideBarStoreSub = this.sideBarStore.subscribe( (flag:boolean) => {
      setTimeout( () => {
        this.sideBarOpen.next(flag)
      },0)
    })
  }
  ngOnInit(): void {
    this.getUserData()
  }

  getUserData(){
    this.store.dispatch(new getUserFinanceActions())
    this.store.dispatch(new getUserSavingsActions())
    this.store.dispatch(new getUserSpendsActions())
    this.store.dispatch(new getUserInfoActions())
  }

  closeSideBar() {
    this.store.dispatch(new sideBarOpenActions({flag:false}))
    this.store.dispatch(new wrapperLockActions({flag:false}))
  }

  clickOutSideBar() {
    this.closeSideBar()
  }


}
