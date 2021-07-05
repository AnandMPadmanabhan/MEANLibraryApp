import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {

  constructor(private http:HttpClient) { }
  
  getBooks(){
    return this.http.get('http://localhost:2000/books')
  }
  getbook(book_id:any){
    let bookid = new HttpParams();
    bookid = bookid.append('bookid', book_id);
    return this.http.get('http://localhost:2000/book',{params:bookid})
  }

  updatebook(book:any){
    console.log(book)
    return this.http.put('http://localhost:2000/book',book)
  }

  addbook(book:any){
    return this.http.post('http://localhost:2000/book',book)
  }

  deletebook(book:any){
    let bookid = new HttpParams();
    bookid = bookid.append('bookid', book);
    return this.http.delete('http://localhost:2000/book',{params:bookid})
  }

  getAuthors(){
    return this.http.get('http://localhost:2000/authors')
  }

  getauthor(author_id:any){
    let authorid = new HttpParams();
    authorid = authorid.append('authorid', author_id);
    return this.http.get('http://localhost:2000/author',{params:authorid})
  }
  updateauthor(author:any){
    console.log(author)
    return this.http.put('http://localhost:2000/author',author)
  }

  addauthor(author:any){
    return this.http.post('http://localhost:2000/author',author)
  }

  deleteauthor(author:any){
    let authorid = new HttpParams();
    authorid = authorid.append('authorid', author);
    return this.http.delete('http://localhost:2000/author',{params:authorid})
  }

  addUser(user:any){
    return this.http.post('http://localhost:2000/signup',user)
  }

  

}
