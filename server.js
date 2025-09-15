import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/generarHistoria", async (req,res)=>{
  const {prompt} = req.body;
  const response = await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${OPENAI_API_KEY}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      model:"gpt-4",
      messages:[{role:"user",content:prompt}],
      max_tokens:400
    })
  });
  const data = await response.json();
  res.json(data);
});

app.listen(process.env.PORT || 3000, ()=>console.log("Servidor corriendo"));
