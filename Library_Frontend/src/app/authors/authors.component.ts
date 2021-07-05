import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BackendserviceService } from '../backendservice.service';
import { AuthorModel } from './author.model';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  title:String="Authors"
  authors:AuthorModel[]=[]
  authorid:string=""
  updateClicked:Boolean=true

  constructor(private authorService:BackendserviceService,private route: ActivatedRoute,
    private router:Router,public _auth:AuthService) {
    this.route.queryParams.subscribe((params)=>{
      this.authorid=params['authorid']
      if(this.authorid==null){
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

  delete_Click(author_id:any){
    this.authorService.deleteauthor(author_id)
     .subscribe((data)=>{
       this.ngOnInit()
  })
}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.authorService.getAuthors()
     .subscribe((data)=>{
       this.authors=JSON.parse(JSON.stringify(data))
       for(var i=0;i<this.authors.length;i++){
         this.authors[i].imageUrl = this.arrayBufferToBase64(this.authors[i].image.data.data);
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
