/* eslint-disable @typescript-eslint/no-var-requires */
import {DispatcherType} from '../../../core-v1/lib/types';
import {getActionType} from '../../../core-v1/lib/utils';
import {IState, ITriggers} from './types';

const store = require('../../build');

export const useTrigger = () => {
  const dispatch = store.default.dispatch;

  const trigger: DispatcherType<ITriggers> = (trigger, status, payload) => {
    const combynedType = getActionType(trigger, status as any);

    dispatch({type: combynedType, payload});
  };

  return trigger;
};

export const getState: () => IState = store.default.getState;
