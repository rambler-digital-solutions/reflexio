import { useSystem } from './System';
import { MakeReducerType } from './types';
import { getNullReducersNames } from './utils';

function makeImmutable(state, payload, reducer) {
  const stateCopy = { ...state };
  reducer(stateCopy, payload);

  return stateCopy;
}

export function makeReducer<AC, StoreType>(
  reducers: MakeReducerType<AC, StoreType>,
  initialState: StoreType
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
    action: { type: string; payload: unknown }
  ) {
    const parts = action.type.split('/');
    const [trigger, status] = [parts[0], parts[1]];
    if (!status) {
      if (reducers[trigger]) {
        if (typeof reducers[trigger] === 'function') {
          return makeImmutable(state, action.payload, reducers[trigger]);
        }
      }
    } else if (reducers[trigger]) {
      if (reducers[trigger][status]) {
        return makeImmutable(state, action.payload, reducers[trigger][status]);
      }
    }

    return state;
  };
}
