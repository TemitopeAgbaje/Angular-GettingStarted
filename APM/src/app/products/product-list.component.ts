import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  selector: "pm-products",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product List";
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = "";
  sub: Subscription = new Subscription;

  filteredProducts: IProduct[] = [];
  private _listFilter: string = "";
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log("In setter:", value);
    this.filteredProducts = this.performFilter(value);
  }

  products: IProduct[] = [
  
  ];

  constructor(private productService: ProductService){}
 

  performFilter(filterBy:string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct)=> product.productName.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub =  this.productService.getProducts().subscribe({
      next: (products) => {this.products =products;
        this.filteredProducts= this.products},
    error:(err) => this.errorMessage= err
      
    });
    
    // this.listFilter = "cart";
  }

  onRatingClicked(message: string){
      this.pageTitle = 'Product List: ' + message
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
