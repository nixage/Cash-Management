import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  Renderer2,
  OnDestroy,
} from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable, SubscriptionLike } from 'rxjs';

import { selectSideBarFlag } from 'src/app/appState/openSideBar/sideBar.selectores';

@Directive({
  selector: '[clickOutSideBar]',
})
export class ClickOutSideBarDirective implements OnDestroy {
  sideBarStore: Observable<boolean> = this.store.pipe(
    select(selectSideBarFlag)
  );
  sideBarListener: SubscriptionLike;

  @Output() clickOutSideBar = new EventEmitter<boolean>();
  sideBarOpened: boolean = false;
  documentListener: () => void;
  documentListenerFlag: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private store: Store,
    private renderer: Renderer2
  ) {
    this.sideBarListener = this.sideBarStore.subscribe((flag: boolean) => {
      this.sideBarOpened = flag;
      if(this.sideBarOpened) {
        // WHY ????? TRIGER CLICK 
        setTimeout( () => {
          this.documentClick()
        }, 0)
      } else if(!this.sideBarOpened && this.documentListenerFlag) {
        this.documentListenerFlag = false;
        this.documentListener()
      }
    });
  }
  ngOnDestroy(): void {
    this.documentListenerFlag = false;
    this.sideBarListener.unsubscribe();
  }

  documentClick() {
    if (this.sideBarOpened) {
      if (!this.documentListenerFlag) {
        this.documentListenerFlag = true;
        this.documentListener = this.renderer.listen('document','click', (event: Event) => {
          const target = event.target as HTMLElement;
          const sideBarBody = this.elementRef.nativeElement;
          if (!sideBarBody.contains(target)) {
            this.clickOutSideBar.emit(true);
          }
        });
      }
    }
  }

}
