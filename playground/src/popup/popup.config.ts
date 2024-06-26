import type {ReactElement} from 'react';
import {Bite, Slice, type BiteStatusWrap} from '@reflexio/core-v1';
import type {IState, ITriggers} from '_redux/types';
import {OpenPopupScript} from './scripts/OpenPopup.script';

export interface IPopupState {
  isOpen: boolean;
  content: string | ReactElement;
}

export interface IPopupTriggers {
  openPopup: BiteStatusWrap<{
    init: string | ReactElement;
    open: null;
    close: null;
  }>;
}

const popupInitialState: IPopupState = {
  content: '',
  isOpen: false,
};

const openPopupBite = Bite<IPopupTriggers, IPopupState, 'openPopup', ITriggers>(
  {
    init: (state, payload) => {
      state.content = payload;
    },
    open: (state, _payload) => {
      state.isOpen = true;
    },
    close: (state, _payload) => {
      state.isOpen = false;
    },
  },
  {
    watchScope: ['openPopup'],
    instance: 'stable',
    script: OpenPopupScript,
    initOn: 'init',
  },
);

export const popupSlice = Slice<IPopupTriggers, IPopupState, ITriggers, IState>(
  'popup',
  {
    openPopup: openPopupBite,
  },
  popupInitialState,
);
