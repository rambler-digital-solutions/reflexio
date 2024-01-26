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
  [K in keyof IR]: IR[K] extends TriggerPhaseWrapper<Record<string, unknown>>
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
> = IR[K] extends TriggerPhaseWrapper<Record<string, unknown>>
  ? GetByKey<ReturnType<IR[K]>, S>
  : IR[K];


  type TriggerPhasePayload2<
  IR,
  K extends keyof IR,
> = IR[K] extends TriggerPhaseWrapper<Record<string, unknown>>
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
) => {payload: TriggerPhasePayload<IR, K, S>, isCatched: boolean};

export type CatchEventType<IR> = <
  K extends keyof IR,
  S extends TriggerPhaseKeys<IR, K>
>(
  type: K,
  status: S,
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
  ITrigger,
  IRootTrigger,
  IState,
  BiteName extends keyof ITrigger
> = {
  customOpts: unknown;
  dispatch: Dispatch;
  setStatus: SetStatusType<ITrigger, BiteName>;
  trigger: DispatcherType<IRootTrigger>;
  triggerOnly: DispatcherType<IRootTrigger>;
  wait: WaiterType<IRootTrigger>;
  hook: HookerType<IRootTrigger>;
  save: DispatcherType<IRootTrigger>;
  uid: string;
  getCurrentState: () => IState;
  drop: () => void;
  state: IState;
  bind: BindHandlerType<ITrigger, BiteName>
};

export type DefautOpts2<
  IRootTrigger,
  IState,
  BiteName extends keyof IRootTrigger
> = {
  customOpts: unknown;
  dispatch: Dispatch;
  setStatus: SetStatusType<IRootTrigger, BiteName>;
  trigger: DispatcherType<IRootTrigger>;
  triggerOnly: DispatcherType<IRootTrigger>;
  wait: WaiterType<IRootTrigger>;
  hook: HookerType<IRootTrigger>;
  save: DispatcherType<IRootTrigger>;
  uid: string;
  getCurrentState: () => IState;
  drop: () => void;
  state: IState;
  bind: BindHandlerType<IRootTrigger, BiteName>;
  catchStatus: CatchStatusType<IRootTrigger, BiteName>;
  catchEvent: CatchEventType<IRootTrigger>;
};



type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };

export type TriggerPhaseWrapper<Args> = (args: Args) => Args;

export type UpdateOnType<ITrigger> = | Array<
Partial<
  Record<keyof ITrigger, TriggerPhaseKeys<ITrigger, keyof ITrigger> 
    | Array<TriggerPhaseKeys<ITrigger, keyof ITrigger>> 
  >
> | keyof ITrigger>


export type MakeBiteReducerType<
  ITrigger,
  IState,
  BiteName extends keyof ITrigger
> = ITrigger[BiteName] extends TriggerPhaseWrapper<Record<string, unknown>>
  ? {
      [S in keyof ReturnType<ITrigger[BiteName]>]: (
        state: IState,
        payload: GetByKey<ReturnType<ITrigger[BiteName]>, S>
      ) => void;
    }
  : (state: IState, payload: ITrigger[BiteName]) => void;

export type MakeBiteProcessorType<
  ITrigger,
  IRootTrigger,
  IState,
  BiteName extends keyof ITrigger
> = {
  triggerStatus: ITrigger[BiteName] extends TriggerPhaseWrapper<
    Record<string, unknown>
  >
    ? keyof ReturnType<ITrigger[BiteName]>
    : '';
  updateOn?:
    | Array<
        Partial<
          Record<keyof ITrigger, TriggerPhaseKeys<ITrigger, keyof ITrigger> 
            | Array<TriggerPhaseKeys<ITrigger, keyof ITrigger>> 
          >
        > | keyof ITrigger
      >
    | Array<keyof ITrigger>;
  instance: 'stable' | 'multiple' | 'refreshing';

  script: unknown; //IA[key];
  opts?: DefautOpts<ITrigger, IRootTrigger, IState, BiteName>;
  customOpts?: unknown;
  canTrigger?: Array<keyof IRootTrigger>;
};

export type MakeBiteType<ITrigger, IRootTrigger, IState, IRootState> = {
  [key in keyof ITrigger]: {
    reducer: MakeBiteReducerType<ITrigger, IState, key> | null;
    processor: MakeBiteProcessorType<
      ITrigger,
      IRootTrigger,
      IRootState,
      key
    > | null;
  };
};

export type ScriptOptsType<
  ITrigger,
  IRootTrigger,
  IState,
  BiteName extends keyof ITrigger
> = DefautOpts<ITrigger, IRootTrigger, IState, BiteName>;

export type ScriptAbstractOptsType<
  IRootTrigger,
  IRootState,
  BiteName extends keyof IRootTrigger
> = DefautOpts2<IRootTrigger, IRootState, BiteName>;


export type ScriptInitArgsType<
  ITrigger,
  Tr extends keyof ITrigger,
  PhK extends TriggerPhaseKeys<ITrigger, Tr>
> = TriggerPhasePayload<ITrigger, Tr, PhK>;

export type ScriptUpdateArgsType<
  ITrigger,
  Tr extends keyof ITrigger,
  S extends TriggerPhaseKeys<ITrigger, Tr>
> = {
  payload: TriggerPhasePayload<ITrigger, Tr, S>;
  trigger: keyof ITrigger;
  status: S;
  hangOn: (args?: { keepUpdate: boolean }) => void;
};


export type ScriptAbstractUpdateArgsType<
  ITrigger,
  Tr extends keyof ITrigger,
> = {
  payload: TriggerPhasePayload2<ITrigger, Tr>;
  trigger: keyof ITrigger;
  status: TriggerPhaseKeys<ITrigger, Tr>;
  hangOn: (args?: { keepUpdate: boolean }) => void;
};

export type ScriptAbstractInitArgsType<
  ITrigger,
  Tr extends keyof ITrigger,
  PhK extends TriggerPhaseKeys<ITrigger, Tr>
> = TriggerPhasePayload<ITrigger, Tr, PhK>;
