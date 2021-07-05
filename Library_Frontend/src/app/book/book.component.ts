import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendserviceService } from '../backendservice.service';
import { BookModel } from '../books/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookid:string=""
  book:BookModel={
    _id:"",
     title: '',
     author:'',
      genre:'',
      description:'',
      image:{
        data:{},
        contentType:''
      },
      imageUrl:''
}
title:String=""
  constructor(private route: ActivatedRoute,private bookService:BackendserviceService) { 
    this.route.queryParams.subscribe((params)=>{
      this.bookid=params['bookid']
    })
  }

  ngOnInit(): void {
    this.bookService.getbook(this.bookid)
      .subscribe((res:any)=>{
        this.book=JSON.parse(JSON.stringify(res))
        this.title=this.book.title
        this.book.imageUrl = this.arrayBufferToBase64(this.book.image.data.data);
        })
   }

   arrayBufferToBase64(buffer:any) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };


}
