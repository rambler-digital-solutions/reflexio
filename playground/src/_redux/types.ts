import type {IComposeState, IComposeTriggers} from '../compose/compose.config';
import type {ILettersState, ILettersTriggers} from '../letters/letters.config';
import type {
  INotificationState,
  INotificationTriggers,
} from '../notification/notification.config';
import type {IPopupState, IPopupTriggers} from '../popup/popup.config';
import type {
  ISettingsState,
  ISettingsTriggers,
} from '../settings/settings.config';

export type IState = {
  letters: ILettersState;
  settings: ISettingsState;
  compose: IComposeState;
  notification: INotificationState;
  popup: IPopupState;
};

export type ITriggers = ILettersTriggers &
  ISettingsTriggers &
  IComposeTriggers &
  INotificationTriggers &
  IPopupTriggers;
