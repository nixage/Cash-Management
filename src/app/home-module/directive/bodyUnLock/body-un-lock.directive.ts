import { Directive, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[bodyUnlock]'
})
export class BodyUnLockDirective {

  constructor(private renderer: Renderer2) { }
  
  @HostListener("click") lockBodyElement(){
    this.bodyUnLock()
  }

  bodyUnLock(){
    this.renderer.removeClass(document.body, 'lock');
  }
}


