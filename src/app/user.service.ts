import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { User } from './User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8002/api/';
  users: User[]= [];
  storage!: boolean;
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser: Observable<User | null> = this.currentUserSubject.asObservable();
  flag = false;
  constructor(private http: HttpClient) { }
  userSignupId!: number;
  url = 'http://localhost:8000/';
  async addUser( firstName: string, lastName: string, password: string, interest: string){
    const currentYear = new Date().getFullYear();
    
    
    const data: User[] = await this.getAllUsers().toPromise() || [];
    this.users = data; 
    const usersInCurrentYear = this.users.filter(user => user.userId.toString().startsWith(currentYear.toString()));
    const nextUserNumber = usersInCurrentYear!.length + 1;
    this.userSignupId = parseInt(`${currentYear}${String(nextUserNumber).padStart(5, '0')}`);
    
    await this.http.post(`${this.url}user`, {
      userId : this.userSignupId ,
      firstName,
      lastName,
      isAdmin : false,
      interest,
      password,
      
      
    }).toPromise()
//    this.currentUser = {userId: userId, firstName: firstName, lastName: lastName, password: password, isAdmin: false};
  //  this.flag = true;
  // return this.userSignupId;


}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}user`).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]); // Return empty array on error
      })
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}user/${id}`);
  }
  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }
}
