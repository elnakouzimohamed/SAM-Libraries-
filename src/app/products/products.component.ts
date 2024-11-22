import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { NgFor } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { EnvironmentProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { CategoryService } from '../category.service';
import { HttpClient } from '@angular/common/http';
import { Category } from '../Category';
import { Product } from '../product';
import { HttpParams } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../User';
import { JsonPipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, AsyncPipe, HttpClientModule, NgIf , RouterModule, FormsModule, JsonPipe, CurrencyPipe], 
  templateUrl: './products.component.html',
  providers: [ ProductService, CategoryService],
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products!: Product[];
  selectedCategory!: Category;
  categories!: any;
  user!: User;
  categorizedProducts!: Product[];
  constructor( private productService: ProductService, private categoryService: CategoryService){
  
    
  }
  categorySelect(category: Category){
    this.selectedCategory = category;
  }
  async ngOnInit(){
    await this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
      this.user = JSON.parse(localStorage.getItem('user') || '{}');

      // Add event listener for 'storage' event to detect changes
      //window.addEventListener('storage', this.handleStorageEvent);
      
  })
  await this.productService.getAllProducts().subscribe((data: Product[]) => {
    this.products = data;
    this.categorizedProducts = data;
    
  })
   // this.user = JSON.parse(localStorage.getItem('user') || '{}');
  
  
  }
  filter(){
    if(this.selectedCategory){
    this.categorizedProducts =  this.products.filter(p => p.category === this.selectedCategory.name);}
    else {
      this.categorizedProducts = this.products
      
    }
    console.log(this.selectedCategory);
    
  }

  }

