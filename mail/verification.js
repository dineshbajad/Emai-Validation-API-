var adminemail='dineshbajad.1906@gmail.com';
var adminpass='drvrwmvpzalhgxlo';
var serviceDomain='Gmail';

const nodemailer=require('nodemailer');
const tempemailrecord=require('../database/tempverfication')
const randomstring=require('randomstring');
const actualemailrecord=require('../database/actualverification');

var smtpTransport=nodemailer.createTransport({
    service:`${serviceDomain}`,
    auth:{
        user:`${adminemail}`,
        pass:`${adminpass}`
    }
});
 

function send(email,host,res){
    token=randomstring.generate(100);
    link=`http://${host}/verify?token=${token}`;
    tempemailrecord.create({email,token},function(err){
        if(err)
        console.log(err);
    });
    mailOptions={
        to:email,
        subject:'Please confirm your Email account',
        html:'Hello,<h3><br>Please click on the link to verify your email.<br><a href='+link+'>Click here to verify</a></h3>'
    }
    //console.log(mailOptions);
    smtpTransport.sendMail(mailOptions,function(error,response){
        if(error){
            res.send('unable to send email')
            res.end('error');
        }
        else{
            res.send('Message sent')
            res.end('sent');
        }
    })
}

function verify(token,res){
    tempemailrecord.findOneAndDelete({token},function(err,temprecord){
        if(!temprecord)
        res.send('Link Expired');
        else
        {
         actualemailrecord.create({email:temprecord.email},function(err,verifiedemail){
             if(!verifiedemail)
            res.send('unable to verify email');
             else
             res.send('email verified');
         })
        }
    })
    
}
var checkemail=(email,res)=>{
actualemailrecord.findOne({email},function(err,email){
    if(!email)
    status='not verified';
    else
    status='verified'
  
    res.json({status});
})
}
module.exports={send,verify,checkemail};