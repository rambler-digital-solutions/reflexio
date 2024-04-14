import {getActionType, type DispatcherType} from '@reflexio/core-v1';
import {store} from ".";
import type {ITriggers} from './types';

export const useTrigger = () => {
  const dispatch = store.dispatch;

  const trigger: DispatcherType<ITriggers> = (trigger, status, payload) => {
    const combinedType = getActionType(trigger, status as any);

    dispatch({type: combinedType, payload});
  };

  return trigger;
};

export const getState = () => {
  return store.getState();
};
