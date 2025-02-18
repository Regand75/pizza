import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[isChicken]'
})
export class IsChickenDirective implements OnInit{

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  @Input()
  isChicken: string = '';

  ngOnInit() {
    if (this.isChicken.toLowerCase().includes('кур')) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  // set isChicken(description: string) {
  //   if (description.toLowerCase().includes('кур')) {
  //     this.viewContainerRef.createEmbeddedView(this.templateRef);
  //   } else {
  //     this.viewContainerRef.clear();
  //   }
  // }
}
