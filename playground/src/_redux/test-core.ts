import {getActionType, type DispatcherType} from '@reflexio/core-v1';
import type {IState, ITriggers} from './types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const store = require('../../dist');

export const useTrigger = () => {
  const dispatch = store.default.dispatch;

  const trigger: DispatcherType<ITriggers> = (trigger, status, payload) => {
    const combinedType = getActionType(trigger, status as any);

    dispatch({type: combinedType, payload});
  };

  return trigger;
};

export const getState: () => IState = store.default.getState;
