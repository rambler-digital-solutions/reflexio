import { ReactElement } from 'react';
import { IState, ITriggers } from 'src/_redux/types';
import { Bite, Slice } from '../../../v1-core/lib';
import { BiteStatusWrap } from '../../../v1-core/lib/types';
import { OpenPopupScript } from './scripts/OpenPopup.script';

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

export const popupInitialState: IPopupState = {
  content: '',
  isOpen: false,
};

const openPopupBite = Bite<IPopupTriggers, IPopupState, 'openPopup', ITriggers>(
  {
    init: (state, payload) => {
      state.content = payload;
    },
    open: (state, payload) => {
      state.isOpen = true;
    },
    close: (state, payload) => {
      state.isOpen = false;
    },
  },
  {
    watchScope: ['openPopup'],
    instance: 'stable',
    script: OpenPopupScript,
    initOn: 'init',
  }
);

export const popupSlice = Slice<IPopupTriggers, IPopupState, ITriggers>(
  'popup',
  {
    openPopup: openPopupBite,
  },
  popupInitialState
);
