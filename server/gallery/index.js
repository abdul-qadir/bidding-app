const express = require('express');
const bodyParser = require('body-parser');

const common = require('./../common');

const router = express.Router();

router.use(bodyParser.json());

// Send All User Related gallery items back
function sendGalleryItems() {
  return common.postgresService.knex.select('id', 'owner', 'url', 'base_price')
    .from('gallery');
}

router.get('/', (req, res) => {
  common.getUserId(req)
       .then(() => sendGalleryItems())
       .then(result => res.status(200).send(result))
       .catch(err => common.handleError(err, res));
});

module.exports = (app) => {
  app.use('/api/gallery', router);
};
