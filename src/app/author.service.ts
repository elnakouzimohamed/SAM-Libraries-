import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from './Author';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }
  
  private url = 'http://localhost:8002/';
  authors!: Author[];
  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.url}author`);
  }


  async addAuthor(author: Author) {
        try {
       
        const authors = await firstValueFrom(this.getAllAuthors());
    
        
        author.authorId = `bk${authors.length + 1}`
        
        await this.http.post(`${this.url}/author`, author).toPromise();
        console.log('Book added successfully:', author);
      } catch (error) {
        console.error('Error adding book:', error);
      }
    
    
    }
  
  
  async deleteAuthor(author: Author) {
    await this.http.delete(`${this.url}author${author.authorId}`).toPromise();
  }  
}
