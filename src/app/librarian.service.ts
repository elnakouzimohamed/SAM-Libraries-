import { Injectable } from '@angular/core';
import { librarian } from './librarian';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class LibrarianService {
  baseUrl = 'http://localhost:8000/';


  constructor(private http: HttpClient) {
  }
  getAllLibrarians(): Observable<librarian[]> {
    return this.http.get<librarian[]>(`${this.baseUrl}/librarians`);
  }

  // Function to add a librarian
  addLibrarian(librarian: librarian): Observable<any> {
    return this.http.post(`${this.baseUrl}/librarians`, librarian);
  }
  relateUserToLibrarian(userId: number,
    librarianId: string,
    meetingDate: string,
    meetingStartTime: string,
    meetingDuration: number ):Observable<any>{
    
    return this.http.post(`${this.baseUrl}/relate_user_to_librarian`, librarian);

  }
  

}
