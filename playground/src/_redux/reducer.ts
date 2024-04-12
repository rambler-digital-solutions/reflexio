import {combineReducers} from 'redux';
import {composeSlice} from '../compose/compose.config';
import {lettersSlice} from '../letters/letters.config';
import {notificationSlice} from '../notification/notification.config';
import {popupSlice} from '../popup/popup.config';
import {settingsSlice} from '../settings/settings.config';

export const rootReducer = combineReducers({
  ...lettersSlice.reducer,
  ...settingsSlice.reducer,
  ...composeSlice.reducer,
  ...notificationSlice.reducer,
  ...popupSlice.reducer,
});
