const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.port || 4000;
const axios  = require("axios");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY , // defaults to process.env["OPENAI_API_KEY"]
});


app.get("/",async(req,res)=>{
  res.send("Code converter backend server")
})
app.post("/convert",async(req,res)=>{
    try {
      if(!req.body.code || req.body.code.trim()=="//enter your code here"){
       res.send( {
            role: "assistant",
            content : "oops you wrote nothing!!!"
          })
      }
      else if(!req.body.language){
       res.send( {
            role: "assistant",
            content : "please select a language to proceed !!!"
          })
      }
      else{
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Hi convert the following code to ${req.body.language} , code : ${req.body.code}` }],
            model: 'gpt-3.5-turbo',
          });
          
          console.log(completion.choices);
          res.send(completion.choices[0].message)
      }
      

      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
      }
})
app.post("/debug",async(req,res)=>{
    try {
        if(!req.body.code || req.body.code.trim()=="//enter your code here"){
            res.send( {
                 role: "assistant",
                 content : "oops you wrote nothing!!!"
               })
           }
           else{
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `Debug the following code effectively.
        find out errors and list them, then tell me how I can improve my code , then at last remove all 
        errors from code and give me the bug free code,
         code : ${req.body.code}` }],
        model: 'gpt-3.5-turbo',
      
      });
    
      console.log(completion.choices);
      res.send(completion.choices[0].message)
    }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
      }
})
app.post("/quality",async(req,res)=>{
    try {
        if(!req.body.code || req.body.code.trim()=="//enter your code here"){
            res.send( {
                 role: "assistant",
                 content : "oops you wrote nothing!!!"
               })
           }
           else{
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `Identitify the following code and it's language , check the quality of the  following code.
        give me an assessment of the code's quality (such as commentary on style, how its organised, potential improvements, etc.) 
        then tell me how I can improve my code , then  remove all 
        errors from code and give me the bug free code in the same language
        at last rate the code quality on a scale of 10 points. Try to provide your response in form of pointers in markdown language
        
        ,
         code : ${req.body.code}` }],
        model: 'gpt-3.5-turbo',
      
      });
    
      console.log(completion.choices);
      res.send(completion.choices[0].message)
    }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
      }
})
app.post("/run",async(req,res)=>{
    try {
        if(!req.body.code || req.body.code.trim()=="//enter your code here"){
            res.send( {
                 role: "assistant",
                 content : "oops you wrote nothing!!!"
               })
           }
           else{
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `
        act as a code compiler and give me output of the following code
        code :${req.body.code}
        .
        
        ,
         code : ${req.body.code}` }],
        model: 'gpt-3.5-turbo',
      
      });
    
      console.log(completion.choices);
      res.send(completion.choices[0].message)
    }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
      }
})







app.listen(port,()=>{
    console.log(`app started at port ${port}`);
})