import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Category } from './Category';
import { firstValueFrom, Observable } from 'rxjs';
import { Product } from './product';
import { json } from 'stream/consumers';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
id!: number;
products!: Product[];
URL = 'http://localhost:8002'
  constructor(private http: HttpClient) { }

  async addProductService( title: string, price: number, category: string, imageUrl: string){
    await this.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
     this.http.post(`http://localhost:8002/api/product`, {
      'productId' : this.products.length +1 ,
      'title' : title,
      'price' : price,
      'category' : category,
      'imageUrl' : imageUrl
      
    }).toPromise()
  })
  }
  /*async addProduct(product: any){
    await this.http.post(`http://localhost:8002/api/product`, 
      product 
      
    );
  }*/

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8002/api/product`);
  }

  async delete(product: Product){
    await this.http.delete(`http://localhost:8002/api/product${product.productId}`).toPromise()
  }

  getProduct(id: string): Observable<Product>{
    return this.http.get<Product>(`http://localhost:8002/api/product${id}`)
  }

  async updateProduct(id: string, product: Product) {
    try {
      await this.http.put(`http://localhost:8002/api/product${id}`,{'productId': id, 'title' : product.title,
      'price' : product.price,
      'category' : product.category,
      'imageUrl' : product.imageUrl}).toPromise();
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }
  
}