import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {map, Subject, Subscription} from 'rxjs';
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from "../../../../environments/environment";
// import * as bootstrap from "bootstrap";
// declare var bootstrap: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  // private observable: Observable<number>;
  private subject: Subject<number>;

  constructor(public cartService: CartService) {

    this.subject = new Subject<number>();
    let count = 0;
    const interval = setInterval(() => {
      this.subject.next(count++);
    }, 1000);
    const timeout1 = setTimeout(() => {
      this.subject.complete();
    }, 4000);

  }

  private subscription: Subscription | null = null;


  ngOnInit(): void {
    // console.log(environment.production);
    // const myModalAlternative = new bootstrap.Modal('#myModal', {});
    // myModalAlternative.show();
    this.subscription = this.subject.subscribe({
        next: (param: number) => {
          console.log('subscribe 1: ', param);
        },
        error: (error: string) => {
          console.log('ERROR!!! ' + error);
        }
      }
    );
  }

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit(): void {
    // this.popupComponent.open();
    // const modalRef = this.modalService.open(PopupComponent);
    // modalRef.componentInstance.data = 'Main component!';
    // this.modalService.open(this.popup, {});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  test() {
    this.subject
      .pipe(
        map((number) => {
          return 'число: ' + number;
        })
      )
      .subscribe((param: string) => {
      console.log('subscribe 2;  ', param);
    });
  }
}
