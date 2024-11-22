import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  imports: [CommonModule, CurrencyPipe]
})
export class BooksComponent {
  book = {
    title: '',
    purchasePrice: 0,
    type: '',
    publisher: '',
    authors: [] as string[],
    categories: [] as string[],
    voiceSummaryUrl: '',
    qty: 0,
    imageUrl: '',
  };

  authors = [
    { name: 'Author 1' },
    { name: 'Author 2' },
    { name: 'Author 3' },
  ];

  categories = [
    { name: 'Fiction' },
    { name: 'Science' },
    { name: 'History' },
  ];

  onAuthorChange(author: string, isChecked: boolean) {
    if (isChecked) {
      this.book.authors.push(author);
    } else {
      const index = this.book.authors.indexOf(author);
      if (index > -1) {
        this.book.authors.splice(index, 1);
      }
    }
  }

  onCategoryChange(category: string, isChecked: boolean) {
    if (isChecked) {
      this.book.categories.push(category);
    } else {
      const index = this.book.categories.indexOf(category);
      if (index > -1) {
        this.book.categories.splice(index, 1);
      }
    }
  }

  add() {
    if (
      this.book.title &&
      this.book.purchasePrice &&
      this.book.qty &&
      this.book.authors.length > 0 &&
      this.book.categories.length > 0
    ) {
      alert('Book added successfully!');
    } else {
      alert('Please fill out all required fields and select at least one author and one category.');
    }
  }
}
