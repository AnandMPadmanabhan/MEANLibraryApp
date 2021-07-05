import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendserviceService } from '../backendservice.service';

@Component({
  selector: 'app-addauthor',
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.css']
})
export class AddauthorComponent implements OnInit {
  title:String=""
  btnText=""
  author={
    _id:"",
     title: '',
     period:'',
      genre:'',
      description:'',
      img:''
}
  authorupdateForm: FormGroup=new FormGroup({
    title: new FormControl(this.author.title),
    period: new FormControl(this.author.period),
    genre: new FormControl(this.author.genre),
    description: new FormControl(this.author.description),
    img:new FormControl('')
  });
  
  authorid:string=""
  image=""

  constructor(private route: ActivatedRoute,private authorService:BackendserviceService,
    private formBuilder: FormBuilder,private router:Router) { 
      this.route.queryParams.subscribe((params)=>{
        this.authorid=params['authorid']
      })
    }

  ngOnInit(): void {
    if(this.authorid){
      this.btnText="Update"
      this.title="Update Author"
      this.authorService.getauthor(this.authorid)
      .subscribe((res)=>{
        this.author=JSON.parse(JSON.stringify(res))
        this.authorupdateForm = this.formBuilder.group({
          title: [this.author.title, [
            Validators.required
          ]],
          period: [this.author.period, [
            Validators.required
          ]],
          genre: [this.author.genre, [
            Validators.required
          ]],
          description: [this.author.description, [
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
      this.title="Add Author"
      this.authorupdateForm = this.formBuilder.group({
        title: [this.author.title, [
          Validators.required
        ]],
        period: [this.author.period, [
          Validators.required
        ]],
        genre: [this.author.genre, [
          Validators.required
        ]],
        description: [this.author.description, [
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
      this.authorupdateForm.get('img')!.setValue(this.image);
    }
  }
  add_updateAuthor(){
    if(this.authorid!=null){
    const formData = new FormData();
    formData.append('_id', this.authorid);
    formData.append('img', this.authorupdateForm.get('img')!.value);
    formData.append('title',this.authorupdateForm.get('title')!.value);
    formData.append('period', this.authorupdateForm.get('period')!.value);
    formData.append('genre', this.authorupdateForm.get('genre')!.value);
    formData.append('description', this.authorupdateForm.get('description')!.value);
    this.authorService.updateauthor(formData)
    .subscribe((res)=>{
      console.log(res)
      this.router.navigate(['/authors'])
    })
  }
  else{
    const formData = new FormData();
    formData.append('_id', this.authorid);
    formData.append('img', this.authorupdateForm.get('img')!.value);
    formData.append('title',this.authorupdateForm.get('title')!.value);
    formData.append('period', this.authorupdateForm.get('period')!.value);
    formData.append('genre', this.authorupdateForm.get('genre')!.value);
    formData.append('description', this.authorupdateForm.get('description')!.value);
    this.authorService.addauthor(formData)
    .subscribe((res)=>{
      console.log(res)
      this.router.navigate(['/authors'])
    })
  }
   

  }

}
