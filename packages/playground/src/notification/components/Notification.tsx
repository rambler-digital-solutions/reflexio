import * as React from 'react';
//import { useSelector } from 'react-redux';
import { IState, ITriggers } from 'src/_redux/types';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
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
      className='notification'
    >
      {notifications[0].content}
    </div>
  ) : null;
};
