import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorModel } from '../authors/author.model';
import { BackendserviceService } from '../backendservice.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  title:String=""
  authorid:string=""
  author:AuthorModel={
    _id:"",
     title: '',
     period:'',
      genre:'',
      description:'',
      image:{
        data:{},
        contentType:''
      },
      imageUrl:''
}

  constructor(private route: ActivatedRoute,private authorService:BackendserviceService) { 
    this.route.queryParams.subscribe((params)=>{
      this.authorid=params['authorid']
    })
  }

  ngOnInit(): void {
    this.authorService.getauthor(this.authorid)
      .subscribe((res)=>{
        console.log(res)
        this.author=JSON.parse(JSON.stringify(res))
        this.title=this.author.title
        this.author.imageUrl = this.arrayBufferToBase64(this.author.image.data.data);
  })

  }

  arrayBufferToBase64(buffer:any) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

}
