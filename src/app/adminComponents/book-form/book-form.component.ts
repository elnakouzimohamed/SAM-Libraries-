import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  categories!: (Category & { checked: boolean })[];
  authors!: (Author & { checked: boolean })[];
  book!: Book;

  id;

  constructor(
    private categoryService: CategoryService,
    private authorService: AuthorService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.bookService.getBook(this.id).subscribe(b => {
        this.book = b;

        // Pre-check categories and authors if editing
        this.categories.forEach(category => {
          category.checked = this.book.categories.some(c => c.categoryName === category.categoryName);
        });

        this.authors.forEach(author => {
          author.checked = this.book.authors.some(a => a.authorName === author.authorName);
        });
      });
    }
  }

  async ngOnInit() {
    // Add `checked` attribute dynamically
    await this.categoryService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data.map(category => ({ ...category, checked: false }));
    });
    await this.authorService.getAllAuthors().subscribe((data: Author[]) => {
      this.authors = data.map(author => ({ ...author, checked: false }));
    });
  }

  async add() {
    // Collect selected categories and authors, omitting the `checked` property
    const selectedCategories = this.categories.filter(c => c.checked).map(c => {
      const { checked, ...categoryWithoutChecked } = c;
      return categoryWithoutChecked;
    });
    const selectedAuthors = this.authors.filter(a => a.checked).map(a => {
      const { checked, ...authorWithoutChecked } = a;
      return authorWithoutChecked;
    });

    // Assign selected categories and authors to the book
    this.book.categories = selectedCategories;
    this.book.authors = selectedAuthors;

    // Add or update the book
    if (this.id) {
      await this.bookService.updateBook(this.id, this.book);
    } else {
      await this.bookService.addBook(this.book);
    }

    // Navigate to books list after saving
    this.router.navigate(['/admin/books']);
  }
}
