const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://user1:user1@anandfiles.9nhfe.mongodb.net/Anandslibrary?retryWrites=true&w=majority')
var schema= mongoose.Schema;
const AuthorSchema = new schema({
    title: String,
    period:String,
    genre:String,
    description:String,
    image:{
        data: Buffer,
        contentType: String
    }
})
const authorData=mongoose.model('authordata',AuthorSchema)

module.exports=authorData
