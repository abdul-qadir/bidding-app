const http = require('http');
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.development');
const common = require('./server/common');

const app = express();
const compiler = webpack(config);

const staticPath = path.resolve(__dirname, 'src/static');
app.use(express.static(staticPath));

const middleware = require('webpack-dev-middleware')(compiler, { // eslint-disable-line
  publicPath: config.output.publicPath,
  hot: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
});

app.use(middleware);
app.use(require('webpack-hot-middleware')(compiler, { log: console.log })); // eslint-disable-line

const server = http.createServer(app);

require('./server/bidding')(app);
require('./server/gallery')(app);
require('./server/user')(app);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  /**if (req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(['https://', req.get('Host'), req.url].join(''));
  } else {
    next();
  }**/
  next();
});

app.get('*', (req, res) => {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  res.end();
});
app.use(express.static(path.join(__dirname, '/dist')));

server.listen(config._hotPort, (err) => {
  if (err) {
    common.logger.log(err);
  }
  common.logger.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', config._hotPort, config._hotPort);
});
