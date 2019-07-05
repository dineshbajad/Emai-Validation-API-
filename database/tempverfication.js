const mongoose=require('mongoose');
 
const tempemailSchema=new mongoose.Schema({
    email:{
        type:String
    },
    token:{
        type:String,
    },
    createdAt:{
        expires:3600,
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('nonVerifiedemails',tempemailSchema);