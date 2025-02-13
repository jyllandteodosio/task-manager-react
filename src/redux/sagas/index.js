import { all } from 'redux-saga/effects';
import { watchTasksSaga } from './tasksSaga';
// import { watchFetchUsers } from './usersSaga';

export default function* rootSaga() {
  yield all([
    watchTasksSaga(),
  ]);
}