import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendserviceService } from '../backendservice.service';
import {BookModel} from '../books/book.model'

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  title:String=""
  btnText=""
  book={
    _id:"",
     price:'',
     title: '',
     author:'',
      genre:'',
      description:'',
      img:''
}
  bookupdateForm: FormGroup=new FormGroup({
    title: new FormControl(this.book.title),
    author: new FormControl(this.book.author),
    genre: new FormControl(this.book.genre),
    description: new FormControl(this.book.description),
    img:new FormControl('')
  });
  
  bookid:string=""
  image=""
  constructor(private route: ActivatedRoute,private bookService:BackendserviceService,
    private formBuilder: FormBuilder,private router:Router) { 
    this.route.queryParams.subscribe((params)=>{
      this.bookid=params['bookid']
    })
    console.log(this.bookid)
  }
 
  ngOnInit(): void {
    if(this.bookid){
      this.btnText="Update"
      this.title="Update Book"
      this.bookService.getbook(this.bookid)
      .subscribe((res)=>{
        this.book=JSON.parse(JSON.stringify(res))
        this.bookupdateForm = this.formBuilder.group({
          title: [this.book.title, [
            Validators.required
          ]],
          author: [this.book.author, [
            Validators.required
          ]],
          genre: [this.book.genre, [
            Validators.required
          ]],
          description: [this.book.description, [
            Validators.required
          ]],
           img: ['', [
            Validators.required
          ]]
        });
      })
    }
    else{
      this.btnText="Add"
      this.title="Add Book"
      this.bookupdateForm = this.formBuilder.group({
        title: [this.book.title, [
          Validators.required
        ]],
        author: [this.book.author, [
          Validators.required
        ]],
        genre: [this.book.genre, [
          Validators.required
        ]],
        description: [this.book.description, [
          Validators.required
        ]],
         img: ['', [
          Validators.required
        ]]
      });
    }
    
  }
    

  selectImage(event:any){
    if(event.target.files.length>0){
      const file=event.target.files[0]
      this.image=file
      this.bookupdateForm.get('img')!.setValue(this.image);
    }
  }
  add_updateBook(){
    if(this.bookid!=null){
    const formData = new FormData();
    formData.append('_id', this.bookid);
    formData.append('img', this.bookupdateForm.get('img')!.value);
    formData.append('title',this.bookupdateForm.get('title')!.value);
    formData.append('author', this.bookupdateForm.get('author')!.value);
    formData.append('genre', this.bookupdateForm.get('genre')!.value);
    formData.append('description', this.bookupdateForm.get('description')!.value);
    this.bookService.updatebook(formData)
    .subscribe((res)=>{
      console.log(res)
      this.router.navigate(['/books'])
    })
  }
  else{
    const formData = new FormData();
    formData.append('_id', this.bookid);
    formData.append('img', this.bookupdateForm.get('img')!.value);
    formData.append('title',this.bookupdateForm.get('title')!.value);
    formData.append('author', this.bookupdateForm.get('author')!.value);
    formData.append('genre', this.bookupdateForm.get('genre')!.value);
    formData.append('description', this.bookupdateForm.get('description')!.value);
    this.bookService.addbook(formData)
    .subscribe((res)=>{
      console.log(res)
      this.router.navigate(['/books'])
    })
  }
   

  }

}
