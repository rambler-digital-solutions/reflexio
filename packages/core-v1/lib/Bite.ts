import type {MakeBiteProcessorType, MakeBiteReducerType} from './types';

type BiteType = <ITriggers, IState, K extends keyof ITriggers, IRootTrigger>(
  reducer: MakeBiteReducerType<ITriggers, IRootTrigger, IState, K>,
  processor: MakeBiteProcessorType<ITriggers, IRootTrigger, K>,
) => {
  reducer: MakeBiteReducerType<ITriggers, IRootTrigger, IState, K>;
  processor: MakeBiteProcessorType<ITriggers, IRootTrigger, K>;
};

export const Bite: BiteType = (reducer, processor) => ({reducer, processor});
