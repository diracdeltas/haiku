const app = require('express')();

async function setup() {
  const { ChatGPTAPI } = await import('chatgpt');
  return new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });
}

const api = await setup();

app.get('/api', async (req, res) => {
  const output = await api.sendMessage(
    `Write a haiku about the following: ${req.params.words}`
  );
  res.setHeader('Content-Type', 'text/plain');
  res.end(output.text);
})

module.exports = app;
