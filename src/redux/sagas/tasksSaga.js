import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchTasks, fetchTaskById, addTask } from '@/api/tasks';
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
	fetchTaskByIdRequest,
  fetchTaskByIdSuccess,
  fetchTaskByIdFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
} from '@/redux/slices/tasksSlice';

function* handleFetchTasks() {
  try {
    const tasks = yield call(fetchTasks);
    yield put(fetchTasksSuccess(tasks));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* handleFetchTaskById(action) {
  try {
    const task = yield call(fetchTaskById, action.payload);
    yield put(fetchTaskByIdSuccess(task));
  } catch (error) {
    yield put(fetchTaskByIdFailure(error.message));
  }
}

function* handleAddTask(action) {
  try {
    const response = yield call(addTask, action.payload);
    yield put(addTaskSuccess(response));
  } catch (error) {
    yield put(addTaskFailure(error.message));
  }
}

export function* watchFetchTasks() {
  yield takeLatest(fetchTasksRequest.type, handleFetchTasks);
  yield takeLatest(fetchTaskByIdRequest.type, handleFetchTaskById);
}

export function* watchAddTask() {
  yield takeLatest(addTaskRequest.type, handleAddTask);
}
