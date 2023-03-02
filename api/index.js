const app = require('express')();

let api = null;

async function setup() {
  /*
  const { ChatGPTUnofficialProxyAPI } = await import('chatgpt');
  api = new ChatGPTUnofficialProxyAPI({ accessToken: process.env.OPENAI_ACCESS_TOKEN});
  */
  const { ChatGPTAPI } = await import('chatgpt');
  api =  new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });
  return api;
}

app.get('/api', async (req, res) => {
  api = api || await setup();
  const prompt = `Write a haiku about the following theme: ${req.query.words}`
  console.log(`prompt: ${prompt}`);
  const output = await api.sendMessage(prompt);
  res.setHeader('Content-Type', 'text/plain');
  res.end(output.text);
})

module.exports = app;
