import {Bite, Slice, type BiteStatusWrap} from '@reflexio/core-v1';
import type {IState, ITriggers} from '_redux/types';
import {OnboardScript} from './scripts/Onboard.script';

interface IOnboardingState {
  stage: number;
}

interface IOnboardingTriggers {
  onboard: BiteStatusWrap<{
    init: null;
    start: null;
    next: null;
    close: null;
  }>;
}

const onboardingInitialState: IOnboardingState = {
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
    start: (state, _payload) => {
      state.stage = 1;
    },
    close: (state, _payload) => {
      state.stage = 0;
    },
    next: (state, _payload) => {
      state.stage += 1;
    },
  },
  {
    watchScope: [],
    instance: 'stable',
    script: OnboardScript,
    initOn: 'init',
  },
);

// eslint-disable-next-line import/no-unused-modules
export const popupSlice = Slice<
  IOnboardingTriggers,
  IOnboardingState,
  ITriggers,
  IState
>(
  'onboarding' as any,
  {
    onboard: onboardBite,
  },
  onboardingInitialState,
);
