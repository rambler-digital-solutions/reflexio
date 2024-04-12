import {
  Bite,
  type DispatcherType,
  type BiteStatusWrap,
} from '@reflexio/core-v1';

export type EffectiveState<I, D, E> = {
  input?: I;
  data?: D | null;
  loaded: boolean;
  loading: boolean;
  error?: E;
};

export type EffectiveTrigger<I, D, E> = BiteStatusWrap<{
  init: I;
  done: D;
  error: E;
}>;

interface EffectiveBiteOpts<State, Trigger> {
  mode?: string;
  onStart?: (trigger: DispatcherType<Trigger>) => void;
  onError?: (trigger: DispatcherType<Trigger>) => void;
  onDone?: (trigger: DispatcherType<Trigger>) => void;
  initReducer?: (state: State, payload: any) => void;
  doneReducer?: (state: State, payload: any) => void;
  errorReducer?: (state: State, payload: any) => void;
}

export const effectiveBite = <
  ITrigger,
  IState,
  K extends keyof ITrigger,
  IRootTrigger,
>(
  promise,
  name: string,
  opts?: EffectiveBiteOpts<IState, ITrigger>,
) => {
  const defaultStartReducer = (state: IState, payload: any) => {
    state[name].input = payload;
    state[name].loading = true;
  };

  const defaultDoneReducer = (state: IState, payload: any) => {
    state[name].loading = false;
    state[name].loaded = true;
    state[name].data = payload;
  };

  const defaultErrorReducer = (state: IState, payload: any) => {
    state[name].loading = false;
    state[name].error = payload;
  };

  return Bite<ITrigger, IState, K, IRootTrigger>(
    {
      init: opts && opts.initReducer ? opts.initReducer : defaultStartReducer,
      done: opts && opts.doneReducer ? opts.doneReducer : defaultDoneReducer,
      error:
        opts && opts.errorReducer ? opts.errorReducer : defaultErrorReducer,
    } as any,
    {
      initOn: 'init',
      addOpts: {
        promise,
        onStart: opts && opts.onStart ? opts.onStart : null,
        onError: opts && opts.onError ? opts.onError : null,
        onDone: opts && opts.onDone ? opts.onDone : null,
      },
      watchScope: [name],
      instance: opts && opts.mode ? (opts.mode as any) : 'stable',
      script: EffectScript,
    } as any,
  ) as any;
};

export const effectiveInitialState = <I, D, E>(
  state?: EffectiveState<I, D, E>,
): EffectiveState<I, D, E> => ({
  data: state && state.data ? state.data : null,
  loading: state && state.loading ? state.loading : false,
  loaded: state && state.loaded ? state.loaded : false,
});

class EffectScript {
  public async init(_args) {
    const co = this.opts.customOpts;

    try {
      if (co && co.onStart) {
        co.onStart(this.opts.trigger);
      }

      const result = await this.opts.addOpts.promise();

      this.opts.setStatus('done', result);

      if (co && co.onDone) {
        co.onDone(this.opts.trigger);
      }
    } catch (error) {
      this.opts.setStatus('error', error);

      if (co && co.onError) {
        co.onError(this.opts.trigger);
      }
    } finally {
      this.opts.drop();
    }
  }
}
