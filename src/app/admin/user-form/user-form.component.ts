import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';
import { response } from 'express';
import { User } from '../../User';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  isAdmin:boolean = false;
  userList!: User[] ;
  
  
  constructor(private userService:UserService){  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      (response: User[])=>{
        this.userList = response;

       
      }
    )


  }


}
