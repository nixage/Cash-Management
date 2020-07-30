import { Component, OnInit, AfterViewInit } from '@angular/core';

// NGRX
import { Store, select } from '@ngrx/store';
import { selectWrapperFlag } from './appState/wrapperLock/wrapperLock.selectors';

// RXJS
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'cash-managment';
  loading:boolean = true
  wrapperLock:Subject<boolean> = new BehaviorSubject<boolean>(false);
  wrapperStore: Observable<boolean> = this.store.pipe(
    select(selectWrapperFlag)
  )

  constructor(public store: Store, private router: Router) {
  }
  ngAfterViewInit(): void {
    this.wrapperStore.subscribe( (flag:boolean) => {
      // WHY ???? ERROR
      setTimeout( () => {
        this.wrapperLock.next(flag)
      }, 0)
    })
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        setTimeout( () => {
          this.loading = false;
        }, 500)
      }
    });
  }
}
