import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { SignupComponent } from './signup/signup.component';
import { adminGuard } from './guards/admin.guard';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { BookFormComponent } from './adminComponents/book-form/book-form.component';
import { AdminBooksComponent } from './adminComponents/admin-books/admin-books.component';
import { AuthorService } from './author.service';
import { AuthorFormComponent } from './adminComponents/author-form/author-form.component';
import { LibrarianComponent } from './librarian/librarian.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { BorrowedAdminListComponent } from './borrowed-admin-list/borrowed-admin-list.component';
import { RecommendComponent } from './recommend/recommend.component';


export const routes: Routes = [
          
      { path: '', component: BookFormComponent },  
      
      { path: 'shopping-cart', component: ShoppingCartComponent },

      { path: 'order-success', component: OrderSuccessComponent },
      { path: 'login', component:LoginComponent  },
      { path: 'admin/admin-orders', component: AdminOrdersComponent, canActivate: [adminGuard]},
     
      { path: 'my/orders', component: MyOrdersComponent },
      { path: 'admin/products/new', component: ProductFormComponent},
      { path: 'admin/products/:id', component: ProductFormComponent},
      { path: 'admin/products', component: AdminProductsComponent }, 
      {path: 'borrowed-admin-list', component: BorrowedAdminListComponent},
      {path: 'admin/books/new', component: BookFormComponent},
      {path: 'admin/books', component: AdminBooksComponent},
      {path: 'admin/books/:id', component: BookFormComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'librarian', component: LibrarianComponent},
      {path: 'manage-account', component: ManageAccountComponent},
      {path: 'admin/authors/new', component: AuthorFormComponent},
      {path: 'chat-bot', component: ChatBotComponent},
      // {path: '/recommend', component: RecommendComponent}

    ];


