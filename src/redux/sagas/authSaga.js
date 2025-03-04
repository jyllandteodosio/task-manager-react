import { call, put, takeLatest, all } from 'redux-saga/effects';
import { login, checkAuth } from '@/api/auth';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  checkAuthRequest,
  checkAuthSuccess,
  checkAuthFailure,
} from '@/redux/slices/authSlice';

function* safeSaga(handler, action) {
  try {
    yield* handler(action);
  } catch (error) {
    console.error(`Saga Error: ${handler.name}`, error);
    yield put({ type: action.type.replace("Request", "Failure"), payload: error.message });
  }
}

function* handleCheckAuth(action) {
  const response = yield call(checkAuth);
  if (response.user) {
    yield put(checkAuthSuccess(response.user));
  } else {
    yield put(checkAuthFailure());
  }
}

function* handleLoginAuth(action) {
  const { credentials, onLoginSuccess } = action.payload;
  const response = yield call(login, credentials);
  yield put(loginSuccess(response));

  if (onLoginSuccess) {
    onLoginSuccess();
  }
}

export function* watchAuthSaga() {
  yield all([
    takeLatest(checkAuthRequest.type, (action) => safeSaga(handleCheckAuth, action)),
    takeLatest(loginRequest.type, (action) => safeSaga(handleLoginAuth, action)),
  ]);
}
