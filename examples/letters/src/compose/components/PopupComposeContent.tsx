import * as React from 'react';
import { useTrigger } from 'src/_redux/useTrigger';

export const PopupComposeContent = () => {
  const trigger = useTrigger();

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
