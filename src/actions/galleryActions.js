import Types from './actionTypes';

export const galleryRequest = (profile, preview) => ({
  type: Types.FETCH_GALLERY_INFO,
  preview,
  profile,
});

export const gallerySuccess = userInfo => ({
  type: Types.FETCH_GALLERY_SUCCESS,
  userInfo,
});
