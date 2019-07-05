const mongoose=require('mongoose');

const actualemailSchema=mongoose.Schema({
    email:{
        type:String
    }
})
module.exports=mongoose.model('verifiedEmails',actualemailSchema);