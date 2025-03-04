import { call, put, takeLatest, all } from 'redux-saga/effects';
import { fetchTasks, fetchTaskById, fetchTasksByUserId, addTask, updateTask, deleteTask } from '@/api/tasks';
import {
  fetchTasksByUserIdRequest,
  fetchTasksByUserIdSuccess,
  fetchTasksByUserIdFailure,
  fetchTaskByIdRequest,
  fetchTaskByIdSuccess,
  fetchTaskByIdFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} from '@/redux/slices/tasksSlice';

function* safeSaga(handler, action) {
  try {
    yield* handler(action);
  } catch (error) {
    console.error(`Saga Error: ${handler.name}`, error);
    yield put({ type: action.type.replace("Request", "Failure"), payload: error.message });
  }
}

function* handleFetchTasksByUserId(action) {
  const userId = action.payload;
  const tasks = yield call(fetchTasksByUserId, userId);
  yield put(fetchTasksByUserIdSuccess(tasks));
}

function* handleFetchTaskById(action) {
  const task = yield call(fetchTaskById, action.payload);
  yield put(fetchTaskByIdSuccess(task));
}

function* handleAddTask(action) {
  const response = yield call(addTask, action.payload);
  yield put(addTaskSuccess(response));
}

function* handleUpdateTask(action) {
  const response = yield call(updateTask, action.payload);
  yield put(updateTaskSuccess(response));
}

function* handleDeleteTask(action) {
  yield call(deleteTask, action.payload);
  yield put(deleteTaskSuccess({ id: action.payload }));
}

export function* watchTasksSaga() {
  yield all([
    takeLatest(fetchTasksByUserIdRequest.type, (action) => safeSaga(handleFetchTasksByUserId, action)),
    takeLatest(fetchTaskByIdRequest.type, (action) => safeSaga(handleFetchTaskById, action)),
    takeLatest(addTaskRequest.type, (action) => safeSaga(handleAddTask, action)),
    takeLatest(updateTaskRequest.type, (action) => safeSaga(handleUpdateTask, action)),
    takeLatest(deleteTaskRequest.type, (action) => safeSaga(handleDeleteTask, action)),
  ]);
}
