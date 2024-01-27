import { ReactElement } from 'react';
import { IState, ITriggers } from 'src/_redux/types';
import { Bite, Slice } from '../../../core-v1/lib';
import { OnboardScript } from './scripts/Onboard.script';
import { BiteStatusWrap } from '../../../core-v1/lib/types';

export interface IOnboardingState {
  stage: number;
}

export interface IOnboardingTriggers {
  onboard: BiteStatusWrap<{
    init: null;
    start: null;
    next: null;
    close: null;
  }>;
}

export const onboardingInitialState: IOnboardingState = {
  stage: 0,
};

const onboardBite = Bite<
  IOnboardingTriggers,
  IOnboardingState,
  'onboard',
  ITriggers
>(
  {
    init: null,
    start: (state, payload) => {
      state.stage = 1;
    },
    close: (state, payload) => {
      state.stage = 0;
    },
    next: (state, payload) => {
      state.stage += 1;
    },
  },
  {
    watchScope: [],
    instance: 'stable',
    script: OnboardScript,
    initOn: 'init',
  }
);

export const popupSlice = Slice<
  IOnboardingTriggers,
  IOnboardingState,
  ITriggers
>(
  'onboarding',
  {
    onboard: onboardBite,
  },
  onboardingInitialState
);
