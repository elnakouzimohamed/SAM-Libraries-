import { Component } from '@angular/core';

import { CommonModule, NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentProviders } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Author } from '../../Author';
import { AuthorService } from '../../author.service';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, CurrencyPipe],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.scss'
})
export class AuthorFormComponent {
  constructor(private authorService: AuthorService){}
    author: Author = {
      authorName: '',
      biography: '',
    };
  
    addAuthor() {
      if (this.author.authorName && this.author.biography) {
        this.authorService.addAuthor(this.author);
        console.log('Author added:', this.author);
        // You can add logic to send the author data to a backend service here.
      } else {
        console.error('Form is invalid.');
      }
    }
  }
  

