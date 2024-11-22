import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthorService } from '../../author.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Author } from '../../Author';

@Component({
  selector: 'app-admin-authors',
  standalone: true,
  imports: [HttpClientModule, RouterLink, RouterModule, CurrencyPipe, CommonModule],
  templateUrl: './admin-authors.component.html',
  styleUrls: ['./admin-authors.component.scss'],
  providers: [AuthorService]
})
export class AdminAuthorsComponent {
  constructor(private authorService: AuthorService, private router: Router) {}

  authors!: Author[];
  author!: Author;
  filteredAuthors!: Author[];

  async ngOnInit() {
    await this.authorService.getAllAuthors().subscribe((data: Author[]) => {
      this.authors = data;
      this.filteredAuthors = this.authors;
    });
  }

  async deleteAuthor(author: Author) {
    await this.authorService.deleteAuthor(author);
    this.router.navigate(['/admin/authors']);
  }

  filter(query: string) {
    this.filteredAuthors = query
      ? this.filteredAuthors.filter(a => a.name.toLowerCase().includes(query.toLowerCase()))
      : this.authors;
  }
}
