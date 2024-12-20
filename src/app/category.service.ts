import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Category } from './Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl= 'http://localhost:8000/';
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}category`);
  }
  getCategories(): Observable<{ categories: Category[] }> {
    return this.http.get<{ categories: Category[] }>(`${this.baseUrl}category`);
  }
}
