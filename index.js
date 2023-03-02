import { ChatGPTAPI } from 'chatgpt';

const app = require('express')();
const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get('/go', async (req, res) => {
  const output = await api.sendMessage(
    `Write a haiku about the following: ${req.params.words}`
  );
  res.setHeader('Content-Type', 'text/plain');
  res.end(output.text);
})

module.exports = app;
