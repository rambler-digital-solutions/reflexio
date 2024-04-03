import {useSystem} from './System';
import type {MakeReducerType} from './types';
import {getNullReducersNames} from './utils';

function makeImmutable(state, payload, reducer) {
  const stateCopy = {...state};

  reducer(stateCopy, payload);

  return stateCopy;
}

export function makeReducer<AC, StoreType>(
  reducers: MakeReducerType<AC, StoreType>,
  initialState: StoreType,
) {
  const nullReducers = getNullReducersNames(reducers);
  const system = useSystem();

  nullReducers.forEach((red) => {
    system.registerProcessor(red, {
      propagate: false,
    });
  });

  return function (
    state: StoreType = initialState,
    action: {type: string; payload: unknown},
  ) {
    const [trigger, status] = action.type.split('/');
    const reducer = reducers[trigger];

    if (!status) {
      if (typeof reducer === 'function') {
        return makeImmutable(state, action.payload, reducer);
      }
    } else if (reducer?.[status]) {
      return makeImmutable(state, action.payload, reducer[status]);
    }

    return state;
  };
}
