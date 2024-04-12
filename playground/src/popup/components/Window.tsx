import * as React from 'react';
import {useReflector} from '@reflexio/react-v1';
import type {IState, ITriggers} from '_redux/types';
import type {IPopupState} from '../popup.config';
import './style.less';

export const Window = () => {
  const popupState: IPopupState = useReflector<
    ITriggers,
    IState,
    IState['popup']
  >((state: IState) => state.popup, ['openPopup']);

  return popupState.isOpen ? (
    <div className="popupBackground">
      <div className="popupWindow">{popupState.content}</div>
    </div>
  ) : null;
};
