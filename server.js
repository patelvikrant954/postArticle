import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cor from 'cors';
import dotenv from 'dotenv';
import route from './routes/route.js';
import textMessages from './constantKeys/constantKeys.js';
import localStorage from 'localStorage'

localStorage.setItem('loginTrue', textMessages.userTextKeys.loginToggleFalse) 
dotenv.config({path:"config.env"})
const app=express();
app.use(cor());
app.use(bodyParser.json({extended:true}));
app.use('/',route)

mongoose.connect(process.env.URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server is running")
    })
}).catch((err)=>{
    throw new Error(textMessages.errorTextKeys.serverConenctingError)
})
