import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BackendserviceService } from '../backendservice.service';
import {BookModel} from './book.model'
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  title:String="Books"
  books:BookModel[]=[]
  bookid:string=""
  updateClicked:Boolean=true
  constructor(private bookService:BackendserviceService,private route: ActivatedRoute,private router:Router,
    public _auth:AuthService) {
    this.route.queryParams.subscribe((params)=>{
      this.bookid=params['bookid']
      if(this.bookid==null){
        this.updateClicked=true
      }
      else{
        this.updateClicked=false
      }
   })

  }

  update_Click(){
    this.updateClicked=false
  }

  delete_Click(book_id:any){
    this.bookService.deletebook(book_id)
     .subscribe((data)=>{
       this.ngOnInit()
  })
}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.bookService.getBooks()
     .subscribe((data:any)=>{
       
       this.books=JSON.parse(JSON.stringify(data))
       for(var i=0;i<this.books.length;i++){
         this.books[i].imageUrl = this.arrayBufferToBase64(this.books[i].image.data.data);
       }
     })
  }
  arrayBufferToBase64(buffer:any) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

}
