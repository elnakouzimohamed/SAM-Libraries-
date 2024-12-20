import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  baseUrl= 'http://localhost:8000/';
  constructor(private http:HttpClient) {}

  addCreditCard(creditCard: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/creditcard`, creditCard);
  }

  // Delete an existing credit card
  deleteCreditCard(creditCardId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/creditcard/${creditCardId}`);
  }

}
