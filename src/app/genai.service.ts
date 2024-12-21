import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GENAIService {
  private apiURL = 'http://127.0.0.1:5000/generate/'
  // private recommendApiURL = 'http://127.0.0.1:5000/recommend/'; // Endpoint for recommendations

  // changed on different computers
// enable CORS for different ports
  constructor(private http : HttpClient) { 

  }
  generate_text(prompt:string):Observable<{generatedText: string}>{

    return this.http.post<{generatedText:string}>(this.apiURL,{prompt})

  }
  // recommend(cart: string[]): Observable<{ cart: string[], recommendations: string[] }> {
  //   return this.http.post<{ cart: string[], recommendations: string[] }>(this.recommendApiURL, { cart });
  // }

}
