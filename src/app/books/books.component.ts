import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { CategoryService } from '../category.service';
import { Category } from '../Category';
import { Book } from '../Book';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../User';
@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BookService, CategoryService],
  imports: [CurrencyPipe, CommonModule, FormsModule]
})
export class BooksComponent {
  currentUser!: User;
  user!: User;
  books: Book[] = [];
  categories: Category[] = [];
  selectedCategories: string[] = [];
  filteredBooks: Book[] = [];
  checkingCategories: (Category & { checked: boolean })[] = [];
  constructor(
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  async ngOnInit() {
    
    // Fetch all categories
    this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
      console.log(data);
      console.log(Array.isArray(data))
      this.checkingCategories = this.categories.map(category => ({
        ...category,
        checked: false
      }));
    });
   
    // Fetch all books
    this.bookService.getAllBookViews().subscribe((data: Book[]) => {
      this.books = data;
      this.filteredBooks = data; // Initially, show all books
    });
    
    if(localStorage.getItem('user')){
      this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}'): null;
    } else {
      this.user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '{}'): null;}
  }


  filter(): void {
    const selectedCategories = this.checkingCategories
      .filter(category => category.checked)
      .map(category => category);

      this.filteredBooks = this.books.filter(book =>
        book.categories.some(bookCategory =>
          selectedCategories.some(selectedCategory => selectedCategory.categoryName === bookCategory.categoryName)
        )
      );
  }
  purchase(book: Book){
    
  }
  borrow(book: Book){}
}