import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sharedTitleType01]',
})
export class TitleType01Directive {

  constructor(public htmlElement: ElementRef, public renderer: Renderer2) {

    this.renderer.setStyle(this.htmlElement.nativeElement, 'color', 'black');
    this.renderer.setStyle(this.htmlElement.nativeElement, 'font-size', '30px');
    this.renderer.setStyle(this.htmlElement.nativeElement, 'text-transform', 'uppercase');

  }


}
