import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private url = 'http://localhost:8002/';
  constructor(private http: HttpClient) { }

  async addToCartForPurchase(shoppingCartId: string, bookCopyId: string) {
    try {
        const payload = { shoppingCartId, bookCopyId }; // Construct payload
        const response = await this.http.post(`${this.url}cart/add/purchase`, payload).toPromise();
        console.log('Book added successfully:', response); // Log the server response
    } catch (error) {
        console.error('Failed to add book to cart:', error); // Handle and log errors
    }
}

}
