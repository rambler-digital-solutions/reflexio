import {makeProcMiddleware} from './createMiddleware';
import {makeReducer} from './createReducer';
import type {MakeBiteType} from './types';

export const Slice = <ITriggers, IState, IRootTrigger, IRootState>(
  sliceName: keyof IRootState,
  bites: MakeBiteType<ITriggers, IState, IRootTrigger>,
  initialState: IState,
  sliceConfig?: {
    ignoreExternal?: Array<keyof IRootState> | 'ignoreAll';
  },
) => {
  const reducer = Object.keys(bites).reduce(
    (acc, curKey) => ({...acc, [curKey]: bites[curKey].reducer}),
    {},
  );
  const processor = Object.keys(bites).reduce((acc, curKey) => {
    if (bites[curKey].processor) {
      return {...acc, [curKey]: bites[curKey].processor};
    } else {
      return acc;
    }
  }, {});

  const injected = {};

  return {
    inject<Inj extends Record<string, unknown>>(args: Inj) {
      Object.assign(injected, args);
    },
    reducer: {[sliceName]: makeReducer(reducer, initialState)},
    middleware: makeProcMiddleware(
      processor,
      reducer,
      sliceName,
      injected,
      sliceConfig,
    ),
  };
};
