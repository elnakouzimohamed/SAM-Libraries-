import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from '../../book.service';
import { NgFor } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Book } from '../../Book';
import { EnvironmentProviders } from '@angular/core';
import { CategoryService } from '../../category.service';
import { NgModel } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-books',
  standalone: true,
  imports: [HttpClientModule,  RouterLink, RouterModule, CurrencyPipe, CommonModule],
  templateUrl: './admin-books.component.html',
  styleUrl: './admin-books.component.scss',
  providers: [BookService, CategoryService]
})
export class AdminBooksComponent {
  constructor(private bookService: BookService, private router: Router) {}

  books!: Book[];
  book!: Book;
  filteredBooks!: Book[];

  async ngOnInit() {
    await this.bookService.getAllBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.filteredBooks = this.books;
    });
  }

  async deleteBook(book: Book) {
    await this.bookService.delete(book);
    this.router.navigate(['/admin/books']);
  }

  filter(query: string) {
    this.filteredBooks = query
      ? this.filteredBooks.filter(b => b.title.toLowerCase().includes(query.toLowerCase()))
      : this.books;
  }
}
