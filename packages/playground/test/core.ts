/* eslint-disable @typescript-eslint/no-var-requires */
const store = require('./build');
import { ITriggers } from '../src/_redux/types';
import { DispatcherType } from '../../reflexio-on-redux/lib/types';
import { getActionType } from '../../reflexio-on-redux/lib/utils';

export const useTrigger = () => {
  const dispatch = store.default.dispatch;

  const trigger: DispatcherType<ITriggers> = (trigger, status, payload) => {
    const combynedType = getActionType(trigger, status as any);
    dispatch({ type: combynedType, payload });
  };

  return trigger;
};

export const getState = store.default.getState;
