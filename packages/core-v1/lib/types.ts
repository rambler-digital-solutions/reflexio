import { Dispatch } from "redux";

export type SystemConfig = {
  env: 'dev' | 'prod' | 'test'
}


export type GetByKey<T, K> = K extends keyof T ? T[K] : null;

export type MakeReducerType<AC, StoreType> = {
  [T in keyof AC]: AC[T] extends Record<string, unknown>
    ? {
        [S in keyof AC[T]]: (
          state: StoreType,
          payload: GetByKey<AC[T], S>
        ) => void;
      }
    : (state: StoreType, payload: AC[T]) => void;
};
export type MakeActionCreatorsType<AC> = {
  [T in keyof AC]: (args: AC[T]) => void;
};

export type TriggerPhaseVals<IR> = {
  [K in keyof IR]: IR[K] extends BiteStatusWrap<Record<string, unknown>>
    ? ReturnType<IR[K]>
    : never;
};
export type TriggerPhaseKeys<
  IR,
  K extends keyof IR
> = K extends keyof OmitNever<TriggerPhaseVals<IR>>
  ? keyof OmitNever<TriggerPhaseVals<IR>>[K]
  : '';
type TriggerPhasePayload<
  IR,
  K extends keyof IR,
  S extends TriggerPhaseKeys<IR, K>
> = IR[K] extends BiteStatusWrap<Record<string, unknown>>
  ? GetByKey<ReturnType<IR[K]>, S>
  : IR[K];


  type TriggerPhasePayload2<
  IR,
  K extends keyof IR,
> = IR[K] extends BiteStatusWrap<Record<string, unknown>>
  ? GetByKey<ReturnType<IR[K]>, TriggerPhaseKeys<IR, K>>
  : IR[K];

export type DispatcherType<IR> = <
  K extends keyof IR,
  S extends TriggerPhaseKeys<IR, K>
>(
  type: K,
  status: S,
  payload: TriggerPhasePayload<IR, K, S>
) => void;

export type WaiterType<IR> = <
  K extends keyof IR,
  S extends TriggerPhaseKeys<IR, K>
>(
  type: K,
  status: S,
  timeout?: number
) => Promise<TriggerPhasePayload<IR, K, S>>;



export type HookerType<IR> = <
  K extends keyof IR,
  S extends TriggerPhaseKeys<IR, K>,
  P extends TriggerPhaseKeys<IR, K>,
>(
  type: K,
  statusStart: S,
  statusStop: P,
  startArgs: TriggerPhasePayload<IR, K, S>,
  timeout?: number
) => Promise<TriggerPhasePayload<IR, K, P>>;


export type CatchStatusType<IR, K extends keyof IR> = <
  S extends TriggerPhaseKeys<IR, K>
>(
  status: S,
  args: unknown,
) => {payload: TriggerPhasePayload<IR, K, S>, isCatched: boolean};

export type CatchEventType<IR> = <
  K extends keyof IR,
  S extends TriggerPhaseKeys<IR, K>
>(
  type: K,
  status: S,
  args: unknown,
) => {payload: TriggerPhasePayload<IR, K, S>, isCatched: boolean};



export type SetStatusType<IR, K extends keyof IR> = <
  S extends TriggerPhaseKeys<IR, K>
>(
  status: S,
  payload: TriggerPhasePayload<IR, K, S>
) => void;

export type BindHandlerType<IR, K extends keyof IR> = <
S extends TriggerPhaseKeys<IR, K>>(
  status: S,
  handlerName: string
) => void;


export type DefautOpts<
  IRootTrigger,
  IState,
  BiteName extends keyof IRootTrigger
> = {
  customTools: unknown;
  dispatch: Dispatch;
  setStatus: SetStatusType<IRootTrigger, BiteName>;
  trigger: DispatcherType<IRootTrigger>;
  wait: WaiterType<IRootTrigger>;
  hook: HookerType<IRootTrigger>;
  save: DispatcherType<IRootTrigger>;
  uid: string;
  getCurrentState: () => IState;
  drop: () => void;
  bind: BindHandlerType<IRootTrigger, BiteName>;
  catchStatus: CatchStatusType<IRootTrigger, BiteName>;
  catchEvent: CatchEventType<IRootTrigger>;
};



type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };

export type BiteStatusWrap<Args> = (args: Args) => Args;

export type UpdateOnType<ITrigger> = | Array<
Partial<
  Record<keyof ITrigger, TriggerPhaseKeys<ITrigger, keyof ITrigger> 
    | Array<TriggerPhaseKeys<ITrigger, keyof ITrigger>> 
  >
> | keyof ITrigger>


export type MakeBiteReducerType<
  ITrigger,
  IRootTrigger,
  IState,
  BiteName extends keyof ITrigger
> = ITrigger[BiteName] extends BiteStatusWrap<Record<string, unknown>>
  ? {
      [S in keyof ReturnType<ITrigger[BiteName]>]: (
        state: IState,
        payload: GetByKey<ReturnType<ITrigger[BiteName]>, S>
      ) => void;
    }
  : (state: IState, payload: ITrigger[BiteName]) => void;

export type MakeBiteProcessorType<
  ITriggers,
  IRootTrigger,
  BiteName extends keyof ITriggers
> = {
  initOn: ITriggers[BiteName] extends BiteStatusWrap<
    Record<string, unknown>
  >
    ? keyof ReturnType<ITriggers[BiteName]>
    : '';
  watchScope:
    | Array<
        Partial<
          Record<keyof IRootTrigger, TriggerPhaseKeys<IRootTrigger, keyof IRootTrigger> 
            | Array<TriggerPhaseKeys<IRootTrigger, keyof IRootTrigger>> 
          >
        > | keyof IRootTrigger
      >
    | Array<keyof IRootTrigger>;
  instance: 'stable' | 'multiple' | 'refreshing';
  
  script: unknown; //IA[key];
  //opts?: DefautOpts2<IRootTrigger, IState, BiteName>;
  customOpts?: unknown;
  //canTrigger?: Array<keyof IRootTrigger>;
};

export type MakeBiteType<ITriggers, IState, IRootTrigger> = {
  [key in keyof ITriggers]: {
    reducer: MakeBiteReducerType<ITriggers, IRootTrigger, IState, key> | null;
    processor: MakeBiteProcessorType<
    ITriggers,
    IRootTrigger,
      key
    > | null;
  };
};

export type ScriptOptsType<
  IRootTrigger,
  IRootState,
  BiteName extends keyof IRootTrigger
> = DefautOpts<IRootTrigger, IRootState, BiteName>;


export type WatchArgsType<
  ITrigger,
  Tr extends keyof ITrigger,
> = {
  payload: TriggerPhasePayload2<ITrigger, Tr>;
  trigger: keyof ITrigger;
  status: TriggerPhaseKeys<ITrigger, Tr>;
  source: string;
  hangOn: () => void;
};

export type InitArgsType<
  ITrigger,
  Tr extends keyof ITrigger,
  PhK extends TriggerPhaseKeys<ITrigger, Tr>
> = TriggerPhasePayload<ITrigger, Tr, PhK>;
