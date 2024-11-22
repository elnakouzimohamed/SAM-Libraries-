import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { CategoryService } from '../category.service';
import { Category } from '../Category';
import { Book } from '../Book';
import { CommonModule, CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-books',
  standalone: true,
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BookService, CategoryService],
  imports: [CurrencyPipe, CommonModule]
})
export class BooksComponent {
  books: Book[] = [];
  categories: Category[] = [];
  selectedCategories: string[] = [];
  filteredBooks: Book[] = [];

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  async ngOnInit() {
    // Fetch all categories
    this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });

    // Fetch all books
    this.bookService.getAllBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.filteredBooks = data; // Initially, show all books
    });
  }

  onCategoryChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const category = checkbox.value;

    if (checkbox.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== category
      );
    }

    this.filterBooks();
  }

  filterBooks() {
    if (this.selectedCategories.length === 0) {
      this.filteredBooks = this.books; // Show all books if no category is selected
    } else {
      this.filteredBooks = this.books.filter((book) =>
        book.categories.some((cat) =>
          this.selectedCategories.includes(cat.name)
        )
      );
    }
  }
  getCategoryNames(book: Book): string {
    return book.categories.map(c => c.name).join(', ');
  }
}
