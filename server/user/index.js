const express = require('express');
const bodyParser = require('body-parser');

const common = require('./../common');

const { upsertUser } = require('./../common/user');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', () => {
  // throw new Error('Why is this being called?')
});

router.post('/', (req, res) => {
  const body = req.body;
  let currentUserId = null;
  common.getUserId(req)
    .catch((error) => {
      common.handleError(error, res);
    })
    .then((userId) => {
      currentUserId = userId;
    })
    .then(() => upsertUser(currentUserId, body))
    .then(result => res.status(200).send(result))
    .catch(err => common.handleError(err, res));
});

module.exports = (app) => {
  app.use('/api/user', router);
};
