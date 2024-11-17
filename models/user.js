const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
    },
    username:{
        type:String,
    } ,
    followers:{
        type:Number,
    } ,
    following:{
        type:Number,
    } ,
    tweets:{
        type:Number,
    },
    likes:{
        type:Number,
    } ,
    id:{
        type:Number,
    } 
});

module.exports = mongoose.model("User",userSchema);
