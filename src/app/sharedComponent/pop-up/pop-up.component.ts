import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppListenerService } from 'src/app/service/appListener/app-listener.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  @Input()
    set close(flag: boolean){
      flag ? this.closePopUp(): ''
    }

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private appListener: AppListenerService
  ) { }

  ngOnInit(): void {
  }

  closePopUp(): void {
    this.router.navigate([{ outlets: { popUpUpdate: null } }], {
      relativeTo: this.activateRoute.parent,
    });
    this.appListener.wrapperLockSubject.next(false)
  }

}
