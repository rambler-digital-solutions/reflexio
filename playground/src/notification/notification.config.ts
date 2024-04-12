import {Bite, Slice, type BiteStatusWrap} from '@reflexio/core-v1';
import type {IState, ITriggers} from '_redux/types';
import type {INotification} from './interfaces/Notification.interface';
import {NotificationScript} from './scripts/Notification.script';

export interface INotificationState {
  notifications: Array<INotification>;
}

export interface INotificationTriggers {
  showNotification: BiteStatusWrap<{
    init: string;
    close: null;
  }>;
}

const notificationInitialState: INotificationState = {
  notifications: [],
};

const showNotificationBite = Bite<
  INotificationTriggers,
  INotificationState,
  'showNotification',
  ITriggers
>(
  {
    init: (state, payload) => {
      state.notifications = [{content: payload}];
    },
    close: (state, _payload) => {
      state.notifications = [];
    },
  },
  {
    script: NotificationScript,
    instance: 'stable',
    initOn: 'init',
    watchScope: ['showNotification'],
  },
);

export const notificationSlice = Slice<
  INotificationTriggers,
  INotificationState,
  ITriggers,
  IState
>(
  'notification',
  {
    showNotification: showNotificationBite,
  },
  notificationInitialState,
);
