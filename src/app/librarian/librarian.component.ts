import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { librarian } from '../librarian';
import { LibrarianService } from '../librarian.service';
import { Observable,of } from 'rxjs';

@Component({
  selector: 'app-librarian',
  standalone: true,
  imports: [NgbModule,ReactiveFormsModule,NgFor,CommonModule],
  templateUrl: './librarian.component.html',
  styleUrl: './librarian.component.scss'
})
export class LibrarianComponent {
  libserv!: LibrarianService;
  selectLibrarian(librarian: any): void {
    // alert(`You selected ${librarian.name}`);
    
  }
  librarians: Observable<librarian[]> = this.libserv.getAllLibrarians(); 
  onClick(e:Event){
    const selectedLib = (e.target as HTMLSelectElement).value;
    console.log('selected', selectedLib)

  }  
  // librarianId:number,
  // firstName:string,
  // lastName:string,
  // service:string,
  // hourRate:number,
  // webexRoom:Url
}
