import * as React from 'react';
import { useSelector } from 'react-redux';
import { IState } from 'src/_redux/types';
import { useTrigger } from 'src/_redux/useTrigger';
import './style.less';

export const Notification = () => {
  const notifications = useSelector(
    (state: IState) => state.notification.notifications
  );
  const trigger = useTrigger();

  return notifications.length ? (
    <div
      onClick={() => trigger('showNotification', 'close', null)}
      className='notification'
    >
      {notifications[0].content}
    </div>
  ) : null;
};
