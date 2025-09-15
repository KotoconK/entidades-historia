import OpenAI from "openai";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",   // 👈 usa este modelo
      messages: [{ role: "user", content: prompt }]
    });
    res.json(completion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.listen(3000, () => console.log("Servidor en puerto 3000"));