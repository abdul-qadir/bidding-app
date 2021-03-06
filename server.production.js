const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.set('port', (process.env.PORT || 8000));

const server = http.createServer(app);

require('./server/bidding')(app);
require('./server/gallery')(app);
require('./server/user')(app);

app.use(cors());

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
