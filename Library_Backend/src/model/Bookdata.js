const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://user1:user1@anandfiles.9nhfe.mongodb.net/Anandslibrary?retryWrites=true&w=majority')
var schema= mongoose.Schema;
const BookSchema = new schema({
    title: String,
    author:String,
    genre:String,
    description:String,
    image:{
        data: Buffer,
        contentType: String
    }
})
const bookData=mongoose.model('bookdata',BookSchema)

module.exports=bookData
