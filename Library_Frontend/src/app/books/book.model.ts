export class BookModel{
    constructor(
        public _id:String,
        public title: String,
        public author:String,
        public genre:String,
        public description:String,
        public image:{
             data: any,
            contentType: String},
        public imageUrl:any
            ){}
}