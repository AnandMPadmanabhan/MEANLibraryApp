import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddauthorComponent } from './addauthor/addauthor.component';
import { AddbookComponent } from './addbook/addbook.component';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';
import { AuthorComponent } from './author/author.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"books",component:BooksComponent,canActivate:[AuthGuard],children:[{path:'update',canActivate:[AdminGuard],component:AddbookComponent}]},
  {path:"addbook",canActivate:[AdminGuard],component:AddbookComponent},
  {path:"book",component:BookComponent,canActivate:[AuthGuard]},
  {path:"authors",component:AuthorsComponent,canActivate:[AuthGuard],children:[{path:'update',canActivate:[AdminGuard],component:AddauthorComponent}]},
  {path:"addauthor",canActivate:[AdminGuard],component:AddauthorComponent},
  {path:"author",component:AuthorComponent,canActivate:[AuthGuard]},
  {path:"login", component:LoginComponent},
  {path:"signup",component:SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
