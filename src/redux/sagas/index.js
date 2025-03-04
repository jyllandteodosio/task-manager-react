import { all } from 'redux-saga/effects';
import { watchTasksSaga } from './tasksSaga';
import { watchUsersSaga } from './usersSaga';
import { watchAuthSaga } from './authSaga';

export default function* rootSaga() {
  yield all([
    watchAuthSaga(),
    watchTasksSaga(),
    watchUsersSaga(),
  ]);
}