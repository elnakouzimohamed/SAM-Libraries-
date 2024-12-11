import { Injectable } from '@angular/core';
import { librarian } from './librarian';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class LibrarianService {
  
  librarianId!:number;
  libs!:librarian[];
  baseUrl = 'http://localhost:8002/';


  constructor(private http: HttpClient) {
  }
  async addLibrarian(firstName: string,lastName:string,hourRate:number){
    const currentYear =  new Date().getFullYear();
    const data: librarian[] = await this.getAllLibrarians().toPromise() || [];
    this.libs = data;
    const libInCurrentYear = this.libs.filter(lib => lib.librarianId.toString().startsWith(currentYear.toString()));
    
  }
  getAllLibrarians():Observable<librarian[]> {
    return this.http.get<librarian[]>(`${this.baseUrl}librarian`);
  }
  getLibrarian(){
    return ; 
  }
  bookService(userId:User,librarianId:librarian){
       this.http.post<User>(`${this.baseUrl}librarian`,null);
      // on click of the user, book a service of a librarian
  }
}
