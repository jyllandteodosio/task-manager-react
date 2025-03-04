import { call, put, takeLatest, all } from 'redux-saga/effects';
import { fetchUsers, fetchUserById, addUser, updateUser, deleteUser } from '@/api/users';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserByIdRequest,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} from '@/redux/slices/usersSlice';

function* safeSaga(handler, action) {
  try {
    yield* handler(action);
  } catch (error) {
    console.error(`Saga Error: ${handler.name}`, error);
    yield put({ type: action.type.replace("Request", "Failure"), payload: error.message });
  }
}

// function* handleFetchUsers() {
//   const users = yield call(fetchUsers);
//   yield put(fetchUsersSuccess(users));
// }

// function* handleFetchUserById(action) {
//   const user = yield call(fetchUserById, action.payload);
//   yield put(fetchUserByIdSuccess(user));
// }

function* handleAddUser(action) {
  try {
    const { newUser, onRegisterSuccess } = action.payload;
    const response = yield call(addUser, newUser);
    yield put(addUserSuccess(response));

    if (onRegisterSuccess) {
      onRegisterSuccess();
    }
  } catch (error) {
    yield put(addUserFailure());
  }
}

// function* handleUpdateUser(action) {
//   const response = yield call(updateUser, action.payload);
//   yield put(updateUserSuccess(response));
// }

// function* handleDeleteUser(action) {
//   yield call(deleteUser, action.payload);
//   yield put(deleteUserSuccess({ id: action.payload }));
// }

export function* watchUsersSaga() {
  yield all([
    // takeLatest(fetchUsersRequest.type, (action) => safeSaga(handleFetchUsers, action)),
    // takeLatest(fetchUserByIdRequest.type, (action) => safeSaga(handleFetchUserById, action)),
    takeLatest(addUserRequest.type, (action) => safeSaga(handleAddUser, action)),
    // takeLatest(updateUserRequest.type, (action) => safeSaga(handleUpdateUser, action)),
    // takeLatest(deleteUserRequest.type, (action) => safeSaga(handleDeleteUser, action)),
  ]);
}
