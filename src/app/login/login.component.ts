import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { User } from '../User';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';import { error } from 'console';
;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  id!: number;
  password!: string;
  user!: User;
  stayLoggedIn!: boolean
  message!: string
  flag1: boolean=false;
  flag2: boolean= false;
  errorMessage!: string;
  flag3: boolean = false; 
  constructor(private userService: UserService, private router: Router){}
  login() {
    if (!this.id || !this.password) {
      this.errorMessage = 'Please enter both ID and password.';
      this.flag3 = true;
      return;
    }
   
    
   this.userService.getUser(this.id).subscribe(
      (data: User) => {
        this.user = data;

        // Check if the user's password matches the provided password
        const hashedPassword = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex);

        if (this.user?.password === hashedPassword) {
          this.message = "Logged in successfully";
          this.userService.setCurrentUser(this.user); // Save logged-in user to service
          const storage = this.stayLoggedIn ? localStorage : sessionStorage;
          this.userService.storage = this.stayLoggedIn;
          storage.setItem('user', JSON.stringify(this.user));
          
          this.flag1 = true;
          this.flag2 = false;
          this.flag3 = false
        
        } else {
          this.message = "The ID and password don't match!";
          this.flag2 = true;
          this.flag1 = false;
          this.flag3 = false
        }

      },
      (error) =>{
        this.errorMessage="Invalid ID"
        this.flag3=true;
        this.flag2 = false;
        console.log(this.errorMessage)
      }
    )}
         
      
  }
