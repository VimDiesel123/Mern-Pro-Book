const express = require('express');
require('dotenv').config();
const proxy = require('http-proxy-middleware');

const app = express();

const apiProxyTarget = process.env.API_PROXY_TARGET;

if (apiProxyTarget) {
  app.use('/graphql', proxy({ target: apiProxyTarget }));
}

app.use(express.static('public'));

const port = process.env.UI_SERVER_PORT || 8000;

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000';

const env = { UI_API_ENDPOINT };

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.listen(port, () => {
  console.log(`UI started on port ${port}`);
});
