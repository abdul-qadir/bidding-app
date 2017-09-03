import Types from './actionTypes';

export const biddingRequest = (profile, preview) => ({
  type: Types.FETCH_BIDDING_INFO,
  preview,
  profile,
});

export const biddingSuccess = userInfo => ({
  type: Types.FETCH_BIDDING_SUCCESS,
  userInfo,
});

export const postBid = (objectId, myBid, bidId) => ({
  type: Types.POST_BID_REQ,
  objectId,
  myBid,
  bidId,
});
