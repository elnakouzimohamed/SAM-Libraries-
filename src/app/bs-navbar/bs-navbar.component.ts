import { Component } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { User } from '../User';
import { NgIf } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { EnvironmentProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-bs-navbar',
  standalone: true,
  imports: [NgbModule, NgIf, HttpClientModule, CommonModule],
  templateUrl: './bs-navbar.component.html',
  providers: [ UserService],
  styleUrl: './bs-navbar.component.scss'
})
export class BsNavbarComponent {
  constructor(private userService: UserService, private router: Router){}
  firstName: string = "Username";
  currentUser: User| null = null;
  user!: User;

 
  
  async ngOnInit(){
  
  if(localStorage.getItem('user')){
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}'): null;
  } else {
    this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '{}'): null;

  
  }
  

    // Add event listener for 'storage' event to detect changes
    window.addEventListener('storage', this.handleStorageEvent);
    
}
handleStorageEvent = (event: StorageEvent) => {
  if (event.key === 'userInfo') {
    console.log('userInfo updated:', event.newValue);
    this.user = event.newValue ? JSON.parse(event.newValue) : null;
  }
};

  logout(){
    if (localStorage.getItem('user')){
    localStorage.removeItem('user');
    } else if(sessionStorage.getItem('user')){
      sessionStorage.removeItem('user');
    }
    this.router.navigate(['']);
  }
  
}
