import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { User } from '../User';

export const adminGuard: CanActivateFn = (route, state) => {

    const router = new Router();
    let 
    user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}'): null;
  
    // Assuming you have a method to get the current user
    
    if (user && user.isAdmin) {
      return true; // User is admin, allow access
    } else {
      router.navigate(['/']); // Redirect to an access denied page
      return false; // User is not admin, deny access
    }
  
};
