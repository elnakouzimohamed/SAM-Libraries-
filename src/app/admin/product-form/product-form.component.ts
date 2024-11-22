import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { Category } from '../../Category';
import { Product } from '../../product';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentProviders } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';




@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [NgFor, HttpClientModule, FormsModule, NgIf, CurrencyPipe],
  providers: [ CategoryService, ProductService],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  selectedCategory!: Category;
  categories!: Category[];
  products!: Product[];
  id;
  price!: number
  imageUrl!: string
  title!: string
  category!: string
  product: Product = {productId: 0, title: '',price: 0, category: '', imageUrl: ''};
  cat = [{name: 'hello', id: 1}];
  constructor(private categoryService: CategoryService, private product_Service: ProductService,private router: Router, private route: ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.product_Service.getProduct(this.id).subscribe(p=> this.product = p)
  }

  async ngOnInit(){
    await this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
     
    });
    await this.product_Service.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });

  }
 /* save(product: any){
    this.product_Service.addProduct(product)
    console.log( product)
  }*/
  async add(){
   if(this.id){
   await this.product_Service.updateProduct(this.id,this.product);
   }else{
   await this.product_Service.addProductService( this.product.title,this.product.price,this.product.category,this.product.imageUrl)
   }
   this.router.navigate(['/admin/products']);
  }
  
}
