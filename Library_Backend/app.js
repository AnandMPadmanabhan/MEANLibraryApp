const express = require('express')
const cors= require('cors')
const jwt= require('jsonwebtoken')
var BookData= require('./src/model/Bookdata')
const multer = require("multer")
var bodyparser=require('body-parser');
var imagedest= __dirname
var upload = multer({ dest: imagedest });
const fs = require('fs')
const AuthorData = require('./src/model/AuthorData')
const UserData = require('./src/model/UserData')
const port=process.env.port || 2000;
var app = new express()
app.use(cors())
app.use(bodyparser.json());
app.use(express.json())

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

app.get('/books',verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS')
    res.contentType('json');
    BookData.find()
    .then((books)=>{
        res.send(books)
    })
})

app.get('/book',verifyToken,(req,res)=>{
    const id=req.query.bookid
    console.log(id)
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS')
    BookData.findOne({_id:id})
    .then((book)=>{
        console.log(book)
        res.send(book)
    })
})

app.put('/book',upload.single('img'),(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    title = req.body.title,
    author = req.body.author,
    description = req.body.description,
    genre = req.body.genre,
   BookData.updateOne({"_id":id},
                                {$set:{"title":title,
                                "author":author,
                                "description":description,
                                "genre":genre,
                                image: {
                                    data:fs.readFileSync(req.file.path),
                                    contentType:'image'
                                }}})
   .then(function(book){
       res.send(book);
   })
 })

 app.post('/book',upload.single('img'),verifyToken,(req,res)=>{
    console.log(req.body)
    var book_item={
    id:req.body._id,
    title : req.body.title,
    author :req.body.author,
    description : req.body.description,
    genre : req.body.genre,
    image: {
        data:fs.readFileSync(req.file.path),
        contentType:'image'
    }}
    var book=BookData(book_item)
    book.save((err,result)=>{
     if(err){}
       res.send(result);
   })
 })

 app.delete('/book',(req,res)=>{
    const id=req.query.bookid
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS')
    BookData.deleteOne({_id:id}).then((book)=>{
        res.send(book)
    })
})

app.get('/authors',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS')
    AuthorData.find()
    .then((authors)=>{
        res.send(authors)
    })
})

app.get('/author',(req,res)=>{
    const id=req.query.authorid
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS')
    AuthorData.findOne({_id:id})
    .then((author)=>{
        res.send(author)
    })
})

app.put('/author',upload.single('img'),(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    title = req.body.title,
    period = req.body.period,
    description = req.body.description,
    genre = req.body.genre,
   AuthorData.updateOne({"_id":id},
                                {$set:{"title":title,
                                "period":period,
                                "description":description,
                                "genre":genre,
                                image: {
                                    data:fs.readFileSync(req.file.path),
                                    contentType:'image'
                                }}})
   .then(function(author){
       res.send(author);
   })
 })

 app.post('/author',upload.single('img'),(req,res)=>{
    console.log(req.body)
    var author_item={
    id:req.body._id,
    title : req.body.title,
    period :req.body.period,
    description : req.body.description,
    genre : req.body.genre,
    image: {
        data:fs.readFileSync(req.file.path),
        contentType:'image'
    }}
    var book=AuthorData(author_item)
    book.save((err,result)=>{
     if(err){}
       res.send(result);
   })
 })

 app.delete('/author',(req,res)=>{
    const id=req.query.authorid
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS')
    AuthorData.deleteOne({_id:id}).then((author)=>{
        res.send(author)
    })
})

app.post('/signup',(req,res)=>{
    console.log(req.body)
    var item={
        name:req.body.name,
        email:req.body.email,
        phone: req.body.phone,
        password: req.body.password,
     }
     console.log("Item"+item.name)
     UserData.findOne({email:item.email})
     .then((user)=>{
         if(user!=null){
            res.send({result:1})
         }
         else{
            var user=UserData(item)
            user.save((err)=>{
               if(err){}
               else{
                 res.send(user)
               }
            })
         }
     })
         
})

app.get('/login',(req,res)=>{
    console.log(req.query)
    const email=req.query.email
    const password= req.query.password
  
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS')
    UserData.findOne({email:email,password:password}).lean()
    .then((user)=>{
        console.log(user)
        if(email=="admin@anandslibrary.com" && password=='Admin2021'){
            let payload={subject:{'email':email,'password':password,'role':"admin"}}
            let token=jwt.sign(payload,'secretKey')
            console.log(token)
            user={email:'admin',token:token}
            res.send(user)
         }
         else{
             if(user!=null){
                let payload={subject:{'email':email,'password':password,'role':"user"}}
                let token=jwt.sign(payload,'secretKey')
                console.log(token)
                user["token"]=token
                console.log(user)
                res.send(user)
             }
             else{
                res.send(user)
             }
             
         }
    })
})

app.listen(2000,(err)=>{
    if(err){}
    else{
        console.log("Server running in 2000")
    }
})

