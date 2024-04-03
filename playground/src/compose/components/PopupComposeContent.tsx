import * as React from 'react';
import {useReflector, useTrigger} from '@reflexio/react-v1';
import {ITriggers} from '../../_redux/types';

export const PopupComposeContent = () => {
  const trigger = useTrigger<ITriggers>();

  return (
    <div>
      <div>Are you sure you want to close ?</div>
      <button onClick={() => trigger('preventClose', 'clear', null)}>
        Yes
      </button>
      <button onClick={() => trigger('openPopup', 'close', null)}>No</button>
    </div>
  );
};
