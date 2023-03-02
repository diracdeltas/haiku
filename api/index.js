const app = require('express')();

async function setup() {
  const { ChatGPTUnofficialProxyAPI } = await import('chatgpt');
  return new ChatGPTUnofficialProxyAPI({ accessToken: process.env.OPENAI_ACCESS_TOKEN});
}

app.get('/api', async (req, res) => {
  const api = await setup();
  const output = await api.sendMessage(
    `Write a haiku about the following: ${req.params.words}`
  );
  res.setHeader('Content-Type', 'text/plain');
  res.end(output.text);
})

module.exports = app;
