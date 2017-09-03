import loginSaga from './loginSaga';
import biddingSaga from './biddingSaga';

export default function* rootSaga() {
  yield [
    loginSaga(),
    biddingSaga(),
  ];
}
