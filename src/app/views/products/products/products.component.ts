import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {HttpClient} from "@angular/common/http";
import {Subscription, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService, private http: HttpClient, private router: Router) {
  }

  public products: ProductType[] = [];
  loading: boolean = false;
  private subscriptionProduct: Subscription | null = null;

  ngOnInit(): void {
    // this.products = this.productService.getProducts();
    this.loading = true;
    this.subscriptionProduct = this.productService.getProducts()
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )
  }

  ngOnDestroy(): void {
    this.subscriptionProduct?.unsubscribe();
  }

}
