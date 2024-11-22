import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './Book';
import { last, Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url = 'http://localhost:8002/';

  constructor(private http: HttpClient) { }
  books!: Book[];
  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.url}book${id}`);
  }

  // here we'll get available book along with the qty of available books 
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.url}book`);
  }

  async deleteBook(book: Book) {
    await this.http.delete(`${this.url}book${book.bookId}`).toPromise();
  }

  getBookDetails(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.url}book${id}`);
  }
  // can be used if the admin wants to update the qty of books available (creating new BookCopy instances with status: availbale)
  // adding copies to existing Book
  async updateBook(id: string, book: Book) {
    try {
      await this.http.put(`${this.url}book${id}`, {
        'bookId': id,
        'title': book.title,
        'purchasePrice': book.purchasePrice,
        'type': book.type,
        'publisher': book.publisher,
        'authors': book.authors,
        'voiceSummaryUrl': book.voiceSummaryUrl,
        'qty': book.qty,
        'categories': book.categories,
        'imageUrl': book.imageUrl
      }).toPromise();
      console.log('Book updated successfully');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  }

  
  lastId!: any
  async addBook(book: Book) {
    try {
     
      const books = await firstValueFrom(this.getAllBooks());
  
      
      book.bookId = `bk${books.length + 1}`
      
      await this.http.post(`${this.url}/book`, book).toPromise();
      console.log('Book added successfully:', book);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  
  
  }



    

  async delete(book: Book){
    await this.http.delete(`${this.url}/book${book.bookId}`).toPromise()
  }
}
