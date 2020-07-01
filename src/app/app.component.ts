import { Component, OnInit } from '@angular/core';
import { AppListenerService } from './service/appListener/app-listener.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cash-managment';
  wrapperLock:boolean = false;

  constructor(private appListener: AppListenerService) {
  }

  ngOnInit() {
    this.appListener.wrapperLockSubject.subscribe( (data: boolean) => {
      setTimeout( () => {
        this.wrapperLock = data;
      }, 0)
    })
  }
}
