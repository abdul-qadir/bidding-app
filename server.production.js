const http = require('http');
const path = require('path');
const express = require('express');

const app = express();

app.set('port', (process.env.PORT || 8000));

const server = http.createServer(app);

require('./server/bidding')(app);
require('./server/gallery')(app);
require('./server/user')(app);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(['https://', req.get('Host'), req.url].join(''));
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(app.get('port'), (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s.', app.get('port'));
});
