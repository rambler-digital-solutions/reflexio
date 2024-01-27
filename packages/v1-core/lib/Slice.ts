import { makeProcMiddleware } from './createMiddleware';
import { makeReducer } from './createReducer';
import { MakeBiteType } from './types';

export const Slice = <ITriggers, IState, IRootTrigger>(
  sliceName: string,
  bites: MakeBiteType<ITriggers, IState, IRootTrigger>,
  initialState: IState
) => {
  const reducer = Object.keys(bites).reduce(
    (acc, curKey) => ({ ...acc, [curKey]: bites[curKey].reducer }),
    {}
  );
  const processor = Object.keys(bites).reduce((acc, curKey) => {
    if (bites[curKey].processor) {
      return { ...acc, [curKey]: bites[curKey].processor };
    } else {
      return acc;
    }
  }, {});

  return {
    reducer: { [sliceName]: makeReducer(reducer, initialState) },
    middleware: makeProcMiddleware(processor, reducer, sliceName),
  };
};
