import { createReducer } from 'reduxsauce';
import get from 'lodash/get';
import Types from './../../actions/actionTypes';

const INITIAL_STATE = {
  currentUser: {
    locale: 'en-US',
    company: 'Appirio',
    location: {
      siteId: 'Jaipur',
      country: 'India',
      site: 'Jaipur',
    },
  },
  setLocale: 'en-US',
  labels: {},
};

/**
const fetchProfileSuccess = ((state = INITIAL_STATE, action) => {
  const userMetadata = {
      locale: 'en-US',
      company: 'Appirio',
      location: {
          siteId: 'Jaipur',
          country: 'India',
          site: 'Jaipur',
      },
  };

  const setLocation = {};

  if (action.userInfo.user_metadata) {
    const authUserMetadata = action.userInfo.user_metadata;
    userMetadata.locale = authUserMetadata.locale;
    userMetadata.location.siteId = `${authUserMetadata.country}-${authUserMetadata.site}`;
    userMetadata.location.country = authUserMetadata.country;
    userMetadata.location.site = authUserMetadata.site;
    userMetadata.company = get(authUserMetadata, 'company', '').toLowerCase();
  }
  setLocation.siteId = userMetadata.location.siteId;
  setLocation.country = userMetadata.location.country;
  setLocation.site = userMetadata.location.site;

  return {
    ...state,
    currentUser: { ...userMetadata },
  };
});
 **/

const fetchBiddingSuccess = (state = INITIAL_STATE, action) => (
    { ...state, biddingItems: get(action, 'items', []), ...state.biddingItems }
  );

const fetchGallerySuccess = (state = INITIAL_STATE, action) => (
    { ...state, gallery: get(action, 'items', []), ...state.gallery }
  );

const logoutSuccess = () => (
  { biddingItems: [], gallery: [], logout: true, login: false, currentUser: {}, appLoaded: false }
);

export const HANDLERS = {
  [Types.FETCH_BIDDING_SUCCESS]: fetchBiddingSuccess,
  [Types.FETCH_GALLERY_SUCCESS]: fetchGallerySuccess,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
