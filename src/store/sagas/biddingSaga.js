import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { fetchBiddingItems, fetchGalleryItems, postBid } from './../../api/biddingItems';
import Types from './../../actions/actionTypes';

function* fetchBiddingItemsSaga() {
  const response = yield call(fetchBiddingItems);
  console.log(response);
  yield put({ type: Types.FETCH_BIDDING_SUCCESS, items: response.result, refresh: response.refresh });
}

function* fetchGalleryItemsSaga() {
  const response = yield call(fetchGalleryItems);
  yield put({ type: Types.FETCH_GALLERY_SUCCESS, items: response });
}

function* postBidSaga(action) {
  const response = yield call(postBid, action.objectId, action.myBid, action.bidId);
  yield put({ type: Types.FETCH_BIDDING_SUCCESS, items: response.result, refresh: response.refresh });
}

export default function* apiSaga() {
  yield [
    takeEvery(Types.FETCH_BIDDING_INFO, fetchBiddingItemsSaga),
    takeEvery(Types.FETCH_GALLERY_INFO, fetchGalleryItemsSaga),
    takeEvery(Types.POST_BID_REQ, postBidSaga),
  ];
}
