import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { User } from '../User';
import * as CryptoJS from 'crypto-js';;

@Component({
  selector: 'app-manage-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.scss'
})
export class ManageAccountComponent {
verified: boolean = false;
password!: string;
user!: User;
message!: string;
async ngOnInit(){
  
  if(localStorage.getItem('user')){
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}'): null;
  } else {
    this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '{}'): null;

  
    }  }
  

verify(){
  if(CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex) === this.user.password){
    this.verified= true;
  }
  else{
    this.message = "Failed to verify. Wrong Password!";
  }
}

}
