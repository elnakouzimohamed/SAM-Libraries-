import { CommonModule, NgFor } from '@angular/common';
import { Component, Injectable, NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { librarian } from '../librarian';
import { LibrarianService } from '../librarian.service';
import { Observable,of } from 'rxjs';
import { User } from '../User';
import { response } from 'express';
@Injectable({
  providedIn:"root",
})

@Component({
  selector: 'app-librarian',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './librarian.component.html',
  styleUrl: './librarian.component.scss'
})
export class LibrarianComponent {
  
  isAdmin!:Boolean;
  isLibrarian!:Boolean;

  librarians:librarian[]=[];
  newLibrarian: librarian = {
    librarianId: 0,
    firstName: '',
    lastName: '',
    service: '',
    hourRate: 0,
    webexRoom: ''
  }

  constructor(private librarianService: LibrarianService){}
   currentUser: User = {
    userId: 1,
    firstName: 'John',
    lastName: 'Doe',
    password: 'password123',
    isAdmin: true, // Replace this with dynamic authentication logic
    isLibrarian: false,
  };
  // for user and admin
  getAllLibrarians():void{
    this.librarianService.getAllLibrarians().subscribe(
      (response)=>{
        this.librarians = response;
      },
      (error) =>{
        console.error("Failed to Fetch Librarians");
      }
    );
  }
  // addLibraian only accessed by admin
  addLibrarian():void{
    this.librarianService.addLibrarian(this.newLibrarian).subscribe(
      (response) => {
        console.log('Librarian added successfully:', response);
        this.getAllLibrarians(); // Refresh the list
        this.newLibrarian = { librarianId: 0, firstName: '', lastName: '', service: '', hourRate: 0, webexRoom: '' }; // Reset form
      },
      (error) => {
        console.error("Failed to add librarian");
      }
      
    );
  }
  

}
