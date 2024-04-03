import * as React from 'react';
import {useReflector, useTrigger} from '@reflexio/react-v1';
import {IState, ITriggers} from 'src/_redux/types';
import {IPopupState} from '../popup.config';
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
