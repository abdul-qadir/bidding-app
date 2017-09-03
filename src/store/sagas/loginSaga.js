import { takeEvery } from 'redux-saga';
import { put, take, call } from 'redux-saga/effects';
import get from 'lodash/get';

import handleUserLoggedin from './../../api/login';
import Types from './../../actions/actionTypes';

function* login(action) {
  try {
    const locale = get(action.profile, 'user_metadata.locale', 'en-US');

    yield [
      put({ type: Types.UPSERT_LOGIN_REQUEST, profile: action.profile }),
      put({ type: Types.FETCH_GALLERY_INFO, locale }),
      put({ type: Types.FETCH_BIDDING_INFO, locale }),
    ];

    yield [
      take(Types.FETCH_GALLERY_SUCCESS),
      take(Types.FETCH_BIDDING_SUCCESS),
    ];

    yield put({ type: Types.LOGIN_SUCCESS });
  } catch (error) {
    yield put({ type: Types.LOGIN_FAILURE, error });
  }
}

function* upsertLoginUser(action) {
  yield call(handleUserLoggedin, action.profile.email, action.profile.nickname);
    // yield put({ type: Types.HANDLE_USER_TOOLS, loggedUser: response, locale: action.locale, profile: action.profile });
}

export default function* apiSaga() {
  yield [
    takeEvery(Types.LOGIN_REQUEST, login),
    takeEvery(Types.UPSERT_LOGIN_REQUEST, upsertLoginUser),
  ];
}
