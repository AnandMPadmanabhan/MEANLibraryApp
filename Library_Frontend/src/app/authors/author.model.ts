export class AuthorModel{
    constructor(
        public _id:String,
        public title: String,
        public period:String,
        public genre:String,
        public description:String,
        public image:{
             data: any,
            contentType: String},
        public imageUrl:any
            ){}
}