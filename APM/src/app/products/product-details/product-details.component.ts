import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  pageTitle:string = 'Product Details '
  product: IProduct | undefined;
  errorMessage: any;


  constructor(private route:ActivatedRoute,
    private router:Router,
    private productService: ProductService) { }


 //ngOnIt is executed when the component is initialized
  ngOnInit(): void {
    //put number cos typescript identifies the id has a string , and we are using number
    const id = Number(this.route.snapshot.paramMap.get('id'))

    //To see the id,
    this.pageTitle += `: ${id}`

    if(id){
      this.getProduct(id)
    }
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }


  onBack(){
    this.router.navigate(["/product"])
  }

}
