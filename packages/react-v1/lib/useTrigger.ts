import {useContext} from 'react';
import {getActionType, type DispatcherType} from '@reflexio/core-v1';
import {StoreContext} from './context';

export const useTrigger = <Tr>(reactSource?: string) => {
  const ctx = useContext(StoreContext);
  const store = ctx.store;
  const trigger: DispatcherType<Tr> = (trigger, status, payload) => {
    const combinedType = getActionType(trigger as any, status as any);

    store.dispatch({type: combinedType, payload, uiSource: reactSource});
  };

  return trigger;
};
