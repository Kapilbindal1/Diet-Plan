
import storage from 'redux-persist/lib/storage';
import { configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import RootReducer from '../reducer';
import sagas from '../saga';

const config = {
  key: 'root',
  storage: storage,
  // blacklist: ['userReducer'],
  debug: true
};

const middleware = [];

const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (true) {
  middleware.push(
    createLogger({
      collapsed: true,
      duration: true,
      timestamp: true,
      colors: {
        title: () => '#F2789F',
        prevState: () => '#de6f0d',
        action: () => '#CAB8FF',
        nextState: () => '#1a9134'
      }
    })
  );
}

const persistedReducer = persistReducer(config, RootReducer);

const enhancers = [...middleware];

const persistConfig = { ...enhancers };

const store = configureStore({
  reducer: persistedReducer,
  middleware: enhancers
});

const persistor = persistStore(store, persistConfig, () => {
  console.debug('Redux Store: ', store.getState());
});

sagaMiddleware.run(sagas);

export { store, persistor };