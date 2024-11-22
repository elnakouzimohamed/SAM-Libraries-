import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import { UserService } from '../user.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { EnvironmentProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../User';
import * as CryptoJS from 'crypto-js';;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, DatePipe, HttpClientModule, NgIf],
  templateUrl: './signup.component.html',
  providers: [ UserService],
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  firstName!: string;
  lastName!: string;
  password1!: string;
  password2!: string;
  interest!: string;
  message!: string
  id!: string;
  flag1 = false;
  flag2 = false;
  currentUser!: User;
  constructor(public userService: UserService ){
      
  }
  ngOnInit(){}
  async submit(){
    if(this.password1 != this.password2) {
      
      this.flag2 = true;
      this.flag1 = false;
    } else{
      this.message= "Welcome " + this.firstName + " " + this.lastName + ". Account created successfuly!" 
      this.flag1=true;
      this.flag2 = false;
   
      await this.userService.addUser(this.firstName,this.lastName, CryptoJS.SHA256(this.password1).toString(CryptoJS.enc.Hex),this.interest);
      

    }


  }
}
