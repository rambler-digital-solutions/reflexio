import { IState, ITriggers } from 'src/_redux/types';
import { Bite, Slice } from '../../../v1-core/lib';
import { BiteStatusWrap } from '../../../v1-core/lib/types';
import { INotification } from './interfaces/Notification.interface';
import { NotificationScrit } from './scripts/Notification.script';

export interface INotificationState {
  notifications: Array<INotification>;
}

export interface INotificationTriggers {
  showNotification: BiteStatusWrap<{
    init: string;
    close: null;
  }>;
}

export const notificationInitialState: INotificationState = {
  notifications: [],
};

export const showNotificationBite = Bite<
  INotificationTriggers,
  INotificationState,
  'showNotification',
  ITriggers
>(
  {
    init: (state, payload) => {
      state.notifications = [{ content: payload }];
    },
    close: (state, payload) => {
      state.notifications = [];
    },
  },
  {
    script: NotificationScrit,
    instance: 'stable',
    initOn: 'init',
    watchScope: ['showNotification'],
  }
);

export const notificationSlice = Slice<
  INotificationTriggers,
  INotificationState,
  ITriggers
>(
  'notification',
  {
    showNotification: showNotificationBite,
  },
  notificationInitialState
);
