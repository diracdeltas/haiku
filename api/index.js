const app = require('express')();

let api = null;

async function setup() {
  const { ChatGPTUnofficialProxyAPI } = await import('chatgpt');
  api = new ChatGPTUnofficialProxyAPI({ accessToken: process.env.OPENAI_ACCESS_TOKEN});
  return api;
}

app.get('/api', async (req, res) => {
  api = api || await setup();
  const output = await api.sendMessage(
    `Write a haiku about the following: ${req.params.words}`
  );
  res.setHeader('Content-Type', 'text/plain');
  res.end(output.text);
})

module.exports = app;
