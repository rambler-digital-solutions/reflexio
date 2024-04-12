import {useState, useEffect, useContext} from 'react';
import type {UpdateOnType} from '@reflexio/core-v1';
import {matchActionType} from './matchActionType';
import {StoreContext} from './context';

export function useReflector<Tr, K, S>(
  mapState: (args: K) => S,
  condition: UpdateOnType<Tr>,
  shouldUpdate?: (payload: any) => boolean,
): S {
  const ctx = useContext(StoreContext);
  const store = ctx.store;
  const system = ctx.system;
  const initialState = mapState(store.getState());
  const [state, setState] = useState(initialState);

  const conditions = typeof condition === 'function' ? condition() : condition;

  useEffect(() => {
    const subscribtion = store.subscribe(() => {
      const task = system.taksQueue.getCurrentTask();

      if (
        !conditions.length ||
        (task && matchActionType<Tr>(task.type, conditions))
      ) {
        if (shouldUpdate) {
          if (shouldUpdate(task.payload)) {
            setState(mapState(store.getState()));
          }
        } else {
          setState(mapState(store.getState()));
        }
      }
    });

    return () => subscribtion();
  }, []);

  return state;
}
