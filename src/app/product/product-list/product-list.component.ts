import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  public pageTitle: string = 'Product List';
  public imageWidth: number = 50;
  public imageMargin: number = 2;
  public showImage: boolean = false;
  public errorMessage: string = '';

  private _subscription!: Subscription;

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  products: IProduct[] = [];

  filteredProducts: IProduct[] = [];

  constructor(private productService: ProductService) {}
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit() {
    this._subscription = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  public toggleImage(): void {
    this.showImage = !this.showImage;
  }

  public performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLowerCase().includes(filterBy)
    );
  }

  public onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
