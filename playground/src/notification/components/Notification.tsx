import * as React from 'react';

import {useReflector, useTrigger} from '@reflexio/react-v1';
import type {IState, ITriggers} from '_redux/types';
import './style.less';

export const Notification = () => {
  const notifications = useReflector<
    ITriggers,
    IState,
    IState['notification']['notifications']
  >((state) => state.notification.notifications, ['showNotification']);
  const trigger = useTrigger<ITriggers>();

  return notifications.length ? (
    <div
      onClick={() => trigger('showNotification', 'close', null)}
      className="notification">
      {notifications[0].content}
    </div>
  ) : null;
};
