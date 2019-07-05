const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://dinesh:dinesh123@ds145359.mlab.com:45359/dineshnodemongo', { useNewUrlParser: true })
.then(()=>console.log('You are now connected to mongo!'))
.catch(err=>console.log('Unable to connect to database'))
 
var app=express();
app.use(bodyParser.urlencoded({extended:true}));

const emailverification=require('./mail/verification');
 
app.get('/',(req,res)=>{
     emailverification.send(req.body.to,req.get('host'),res);
 })

app.get('/verify',(req,res)=>{
emailverification.verify(req.query.token,res);     
})

app.get('/check',(req,res)=>{
emailverification.checkemail(req.body.email,res);
})
app.listen(3000,function(){
    console.log('server running on port 3000');
})