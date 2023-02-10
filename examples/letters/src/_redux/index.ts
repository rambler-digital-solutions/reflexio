import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { composeSlice } from 'src/compose/compose.config';
import { lettersSlice } from 'src/letters/letters.config';
import { notificationSlice } from 'src/notification/notification.config';
import { popupSlice } from 'src/popup/popup.config';
import { settingsSlice } from 'src/settings/settings.config';
import rootReducer from './reducer';
import {
  System,
  useSystem,
} from '../../../../packages/reflexio-on-redux/dist/lib/System';

function configureStore() {
  const middlewares: Middleware[] = [
    lettersSlice.middleware,
    settingsSlice.middleware,
    composeSlice.middleware,
    notificationSlice.middleware,
    popupSlice.middleware,
  ];

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  );

  store.subscribe;

  return store;
}
const system = useSystem();

//system.afterHandlers.forEach( ah => store.subscribe(ah))
const store = configureStore();
store.subscribe(() => {
  system.afterHandlers.forEach((s) => s());
});

export const dispatch = store.dispatch;
export default store;
