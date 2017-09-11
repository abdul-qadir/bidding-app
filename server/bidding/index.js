const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const common = require('./../common');

const router = express.Router();

router.use(bodyParser.json());

// Send All User Related Bidding Items back
function sendBiddingItems() {
  return common.postgresService.knex.table('bidding_winner').innerJoin('users', 'users.user_id', '=', 'bidding_winner.user_id');
}

function postBiddingItem(biddingObj, userId) {
  const biddingObject = {
    user_id: userId,
    object_id: biddingObj.objectId,
    price: biddingObj.price,
    updated_at: moment.utc(),
  };
  if (biddingObj.bidId) {
    return common.postgresService.knex('bidding_winner')
      .where('object_id', biddingObj.objectId)
      .where('price', '<', biddingObj.price)
      .update(biddingObject);
  }
  return common.postgresService.knex('bidding_winner')
      .insert(biddingObject);
}

function postBiddingUsers(biddingObj, userId) {
  const commentObjectLocal = {
    user_id: userId,
    object_id: biddingObj.objectId,
    price: biddingObj.price,
  };
  return common.postgresService.knex('bidding_users').insert(commentObjectLocal);
}

router.get('/', (req, res) => {
  common.getUserId(req)
    .then(() => sendBiddingItems())
    .then((result) => { const obj = Object.assign({}, { result, refresh: false }); return res.status(200).send(obj); })
    .catch(err => common.handleError(err, res));
});

router.post('/', (req, res) => {
  const biddingObj = req.body;
  let currentUserId = null;
  let upsertFail = false;
  common.getUserId(req)
    .then((userId) => {
      currentUserId = userId;
      return postBiddingItem(biddingObj, userId);
    })
    .then((result) => { if (result === 0) { upsertFail = true; return upsertFail; } return postBiddingUsers(biddingObj, currentUserId); })
    .then(() => sendBiddingItems())
    .then((result) => { const obj = Object.assign({}, { result, refresh: upsertFail }); return res.status(200).send(obj); })
    .catch(err => common.handleError(err, res));
});


module.exports = (app) => {
  app.use('/api/bidding', router);
};
