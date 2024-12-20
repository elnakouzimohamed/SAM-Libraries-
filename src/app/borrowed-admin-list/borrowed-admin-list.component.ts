import { Component } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-borrowed-admin-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './borrowed-admin-list.component.html',
  styleUrl: './borrowed-admin-list.component.scss'
})
export class BorrowedAdminListComponent{
borrowedBooks:any[]=[];
isAdmin:boolean = true;
constructor(private shoppingCartService:ShoppingCartService){}
async fetchAllBorrowedBooks(): Promise<void> {

    this.borrowedBooks = await this.shoppingCartService.getAllBorrowedBooks();

}


}
