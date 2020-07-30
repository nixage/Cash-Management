import { Directive, Renderer2, HostListener, Injectable, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { sideBarOpenActions } from 'src/app/appState/openSideBar/sideBar.actions';
import { wrapperLockActions } from 'src/app/appState/wrapperLock/wrapperLock.actions';

@Directive({
  selector: '[bodyLock]'
})

@Injectable({
  providedIn: 'root'
})
export class BodyLockDirective {


  constructor(private renderer: Renderer2, private store: Store, private el: ElementRef) { }

  @HostListener("document:click", ['$event']) handleClick(event: Event){
    console.log(event)
  }
}
