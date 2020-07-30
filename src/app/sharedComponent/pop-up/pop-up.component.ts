import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { wrapperLockActions } from 'src/app/appState/wrapperLock/wrapperLock.actions';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {

  @Input()
    set close(flag: boolean){
      flag ? this.closePopUp(): ''
    }

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private store: Store
  ) { }

  closePopUp(): void {
    this.router.navigate([{ outlets: { popUpUpdate: null } }], {
      relativeTo: this.activateRoute.parent,
    });
    this.store.dispatch( new wrapperLockActions({flag:false}))
  }

}
