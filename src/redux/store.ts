import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices';
import { RootState } from '@/types';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const createMiddleware = () => {
  const sagaMiddleware = createSagaMiddleware();
  return { sagaMiddleware, middleware: [sagaMiddleware] };
};

export const setupStore = (preloadedState?: Partial<RootState>) => {
  const { sagaMiddleware, middleware } = createMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ 
        thunk: false,
        serializableCheck: {
          ignoredActions: ['auth/loginRequest', 'users/addUserRequest'],
          ignoredPaths: ['auth/payload.onLoginSuccess', 'users/onRegisterSuccess'],
        }
      }).concat(middleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });

  sagaMiddleware.run(rootSaga); // Run saga for each instance

  return store;
};

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
