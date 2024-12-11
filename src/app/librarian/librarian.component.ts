import { CommonModule, NgFor } from '@angular/common';
import { Component, Injectable, NgModule } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { librarian } from '../librarian';
import { LibrarianService } from '../librarian.service';
import { Observable,of } from 'rxjs';
import { User } from '../User';
@Injectable({
  providedIn:"root",
})

@Component({
  selector: 'app-librarian',
  standalone: true,
  imports: [NgbModule,ReactiveFormsModule,NgFor,CommonModule],
  templateUrl: './librarian.component.html',
  styleUrl: './librarian.component.scss'
})
export class LibrarianComponent {
  userID!:User;
  librarianID!:librarian;
  libserv!: LibrarianService;
  selectLibrarian(librarian: any): void {
    // alert(`You selected ${librarian.name}`);
    
  }
  constructor(private libService: LibrarianService){}
  librarians: Observable<librarian[]> = this.libserv.getAllLibrarians(); 
  bookService(){
    this.libService.bookService(this.userID,this.librarianID);

  }  
  // librarianId:number,
  // firstName:string,
  // lastName:string,
  // service:string,
  // hourRate:number,
  // webexRoom:Url
}
