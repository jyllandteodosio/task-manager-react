import { all } from 'redux-saga/effects';
import { watchFetchTasks, watchAddTask } from './tasksSaga';
// import { watchFetchUsers } from './usersSaga';

export default function* rootSaga() {
  yield all([
    watchFetchTasks(),
    watchAddTask(),
    // watchFetchUsers(),
  ]);
}