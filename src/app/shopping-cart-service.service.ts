import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './Book';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private url = 'http://localhost:8000/';
  constructor(private http: HttpClient) { }

  async addToCartForPurchase(shoppingCartId: number, bookCopyId: string) {
    try {
        const payload = { shoppingCartId, bookCopyId }; // Construct payload
        const response = await this.http.post(`${this.url}cart/add/purchase`, payload).toPromise();
        console.log('Book added successfully:', response); // Log the server response
    } catch (error) {
        console.error('Failed to add book to cart:', error); // Handle and log errors
    }
}
async addToCartForBorrowing(shoppingCartId: number, bookCopyId: string): Promise<any> {
  try {
      const payload = { shoppingCartId, bookCopyId }; // Construct payload
      const response = await this.http.post(`${this.url}cart/add/borrow`, payload).toPromise();
      console.log('Book added to cart for borrowing successfully:', response); 
      return response; // Return the response
  } catch (error) {
      console.error('Failed to add book to cart for borrowing:', error); // Handle errors
      throw error; // Re-throw error for the caller to handle
  }
}
async removeFromCart(shoppingCartId: number, bookCopyId: string): Promise<any> {
  try {
      const payload = { shoppingCartId, bookCopyId }; // Construct payload
      const response = await this.http.delete(`${this.url}cart/remove`, {
          body: payload, // Sending payload as body of DELETE request
      }).toPromise();
      console.log('Book removed from cart successfully:', response); // Log server response
      return response; // Return the response
  } catch (error) {
      console.error('Failed to remove book from cart:', error); // Handle errors
      throw error; // Re-throw error for caller to handle
  }
}
async getCartItems(userId: string) {
  return this.http.get<any[]>(`${this.url}/cart/${userId}`).toPromise();
}
async getAllBorrowedBooks(): Promise<any[]> {
  try {
    return await firstValueFrom(this.http.get<any[]>(`${this.url}borrowed_book_copies`));
  } catch (error) {
    console.error('Failed to fetch borrowed books:', error);
    throw error;
  }
    

}}
