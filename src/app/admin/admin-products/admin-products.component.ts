import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../product.service';
import { NgFor } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Product } from '../../product';
import { EnvironmentProviders } from '@angular/core';
import { CategoryService } from '../../category.service';
import { NgModel } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [HttpClientModule, NgFor, RouterLink, RouterModule, CurrencyPipe],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
  providers: [  ProductService, CategoryService]
})
export class AdminProductsComponent {
   constructor(private productService: ProductService, private router:Router){
    
  }
  products!: Product[];
  product!: Product;
  filteredProducts!: Product[];
 async ngOnInit(){
   await this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts=this.products;

  });
    
  }
 async deleteProduct(product: Product){
     await this.productService.delete(product)
     this.router.navigate(['/admin/products'])
  }
  filter(query: string){
    this.filteredProducts = (query) ? this.filteredProducts.filter(p=> p.title.toLowerCase().includes(query.toLowerCase())) : this.products;

  }
}
