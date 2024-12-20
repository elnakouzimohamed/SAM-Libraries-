import { Component, NgModule } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart-service.service';
import { Book } from '../Book';
import { AuthorService } from '../author.service';
import { UserService } from '../user.service';
import { ShoppingCart } from '../shopping-cart';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CreditCardService } from '../credit-card.service';
import { CREDITCARD } from '../creditcard';
import { User } from '../User';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  user!:User;
  shoppingCart! :ShoppingCart ;
  buyCartItems: any[] = [];
  borrowCartItems:any[]=[];
  cartItems = this.buyCartItems.concat(this.borrowCartItems);
  errorMessage: string = '';
  showCheckoutPopup: boolean = false; // Controls the popup visibility
  showCreditCardPopUp:boolean = false;
  addedCreditCard: CREDITCARD | null = null;
  creditCard: CREDITCARD={
    creditCardId: '',
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    userId: ''
  };

  totalPrice: number = 0;


  constructor( public shoppingCartService: ShoppingCartService,
    public creditCardService: CreditCardService,
    private router:Router
  ){ }
  // on each created shopping cart instantiate a service(public)
  
  async addToCartForPurchase(bookCopyId: string) {
    if (!this.shoppingCart) {
      this.errorMessage = 'Shopping cart not initialized.';
      return;
    }
    try {
      const response = await this.shoppingCartService.addToCartForPurchase(
        this.shoppingCart.shoppingCartId,
        bookCopyId
      );
      console.log(response);
      this.cartItems.push({ bookCopyId }); // Update UI
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Failed to add item to cart.';
    }
  }
  async addToCartForBorrowing(bookCopyId: string) {
    try {
      const response = await this.shoppingCartService.addToCartForBorrowing(
        this.shoppingCart.shoppingCartId,
        bookCopyId
      );//send the current to be added to shopping cart
      console.log(response);
      this.cartItems.push({ bookCopyId }); // Update UI
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Failed to borrow item.';
    }

  }
  async removeFromCart(bookCopyId: string) {
    if (!this.shoppingCart) {
      this.errorMessage = 'Shopping cart not initialized.';
      return;
    }
    try {
      const response = await this.shoppingCartService.removeFromCart(
        this.shoppingCart.shoppingCartId,
        bookCopyId
      );
      console.log(response);
      // Remove item from UI
      this.cartItems = this.cartItems.filter(item => item.bookCopyId !== bookCopyId);
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Failed to remove item from cart.';
    }
  }
  openCreditCardPopup(){
    this.showCreditCardPopUp = true;
  }
  closeCreditCardPopup(){
    this.showCreditCardPopUp = false;
  }

  async addCreditCard(){
    this.creditCardService.addCreditCard(this.creditCard).subscribe(
      (response) => {
        this.errorMessage = '';
        this.closeCreditCardPopup();
        this.closeCreditCardPopup();
      },
      (error) => {
        console.error('Error adding credit card:', error);
        this.errorMessage = 'Failed to add credit card.';
      }
    );
  }

  openCheckout() {
    this.showCheckoutPopup = true;

  }

  // Close the checkout popup
  closeCheckout() {
    this.showCheckoutPopup = false;
    this.showCreditCardPopUp=false;
  }

  checkout() {
    alert('Checkout successful!');
    // remove all items from shopping cart
    this.totalPrice = 0;
    this.closeCheckout();
  }


}
