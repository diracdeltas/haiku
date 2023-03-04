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

const promptLengthMax = 200;

app.get('/api', async (req, res) => {
  api = api || await setup();
  
  const words = req.query.words;
  if (words.length > promptLengthMax) {
    console.error(`Rejected request because prompt was too long: ${words.length} > ${promptLengthMax}`);
    res.status(400).end();
    return;
  }

  const prompt = `Write a haiku about the following theme: ${words}`;
  console.log(`Accepted request with prompt: ${prompt}`);
  try {
    const output = await api.sendMessage(prompt);
    res.setHeader('Content-Type', 'text/plain');
    res.end(output.text);      
  } catch (error) {
    console.error(`Haiku generation failed:`, error);
    res.status(500).end();
  }
})

module.exports = app;
