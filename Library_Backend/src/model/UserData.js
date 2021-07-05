const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://user1:user1@anandfiles.9nhfe.mongodb.net/Anandslibrary?retryWrites=true&w=majority');
const schema=mongoose.Schema;
const UserSchema = new schema({
    name: String,
    email:String,
    phone:String,
    password:String  
})
const userData=mongoose.model('userdata',UserSchema)

module.exports=userData