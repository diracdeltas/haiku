import OpenAI from 'openai';
import express from 'express';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL =
  process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
const MODEL = 'tngtech/deepseek-r1t2-chimera:free';

const PORT = process.env.PORT || 443;

const app = express();
const openai = new OpenAI({
  apiKey: OPENROUTER_API_KEY,
  baseURL: OPENROUTER_BASE_URL
})


const promptLengthMax = 200;

app.get('/api', async (req, res) => {
  const words = req.query.words;
  if (words.length > promptLengthMax) {
    console.error(`Rejected request because prompt was too long: ${words.length} > ${promptLengthMax}`);
    res.status(400).end();
    return;
  }

  const prompt = `Write a haiku about the following theme: ${words}. ONLY include the haiku in your response, separating each line with a newline.`;
  console.log(`Accepted request with prompt: ${prompt}`);

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: MODEL,
    });
    console.log(`completions: ${completion.choices}`);
    res.setHeader('Content-Type', 'text/plain');
    res.end(completion.choices[0].message.content);
  } catch (error) {
    console.error(`Haiku generation failed:`, error);
    res.status(500).end();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
