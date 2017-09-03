import AuthService from './auth';

export const fetchBiddingItems = () => {
  const idToken = AuthService.getToken();
  return fetch('/api/bidding', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
        .then(response => response.json());
};

export const fetchGalleryItems = () => {
  const idToken = AuthService.getToken();
  return fetch('/api/gallery', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
    .then(response => response.json());
};

export const postBid = (objectId, price, bidId) => {
  const idToken = AuthService.getToken();
  return fetch('/api/bidding', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      objectId,
      price,
      bidId,
    }),
  })
    .then(response => response.json());
};
