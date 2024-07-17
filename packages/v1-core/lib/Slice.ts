import { makeProcMiddleware } from './createMiddleware';
import { makeReducer } from './createReducer';
import { MakeBiteType } from './types';
import { useSystem } from './System';

export const Slice = <ITriggers, IState, IRootTrigger, IRootState>(
  sliceName: keyof IRootState,
  bites: MakeBiteType<ITriggers, IState, IRootTrigger>,
  initialState: IState,
  sliceConfig?: {
    ignoreExternal?: Array<keyof IRootState> | 'ignoreAll'
  }
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

  let injected = {};


  return {
    inject<Inj extends Record<string, unknown>>(args: Inj){
      Object.assign(injected, args);
      console.log('changed Inject');
    },
    reducer: { [sliceName]: makeReducer(reducer, initialState) },
    middleware: makeProcMiddleware(processor, reducer, sliceName, injected, sliceConfig),
  };
};