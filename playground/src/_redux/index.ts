import {createStore, applyMiddleware, compose, Middleware} from 'redux';
import {useSystem} from '@reflexio/core-v1';
import {composeSlice} from '../compose/compose.config';
import {lettersSlice} from '../letters/letters.config';
import {notificationSlice} from '../notification/notification.config';
import {popupSlice} from '../popup/popup.config';
import {settingsSlice} from '../settings/settings.config';
import {rootReducer} from './reducer';
const system = useSystem();

composeSlice.inject({
  someData: 'someData For Testing',
});

function configureStore() {
  const system = useSystem();

  system.setConfig({
    env: 'dev',
  });

  const middlewares: Middleware[] = [
    lettersSlice.middleware,
    settingsSlice.middleware,
    composeSlice.middleware,
    notificationSlice.middleware,
    popupSlice.middleware,
  ];

  const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

  return store
}

export const store = configureStore();

store.subscribe(()=> {
  system.afterEffects.handleAfterEffect(store.dispatch)
})

store.dispatch({
  type: 'setContent/init',
  payload: null,
});
