import { Directive, Renderer2, HostListener, Injectable } from '@angular/core';

@Directive({
  selector: '[bodyLock]'
})

@Injectable({
  providedIn: 'root'
})
export class BodyLockDirective {


  constructor(private renderer: Renderer2) { }

  @HostListener("click") lockBodyElement(){
    this.bodyLock()
  }

  bodyLock(){
    this.renderer.addClass(document.body, 'lock');
  }
}
