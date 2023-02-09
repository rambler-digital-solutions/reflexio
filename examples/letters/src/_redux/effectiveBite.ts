import { Bite } from "../../../../dist/lib"
import { DispatcherType, TriggerPhaseWrapper } from "../../../../dist/lib/types"

export type EffectiveState<I, D, E> = {
    input?: I
    data?: D | null
    loaded: boolean
    loading: boolean
    error?: E 
}

export type EffectiveTrigger<I, D, E> = TriggerPhaseWrapper<{
    init: I,
    done: D,
    error: E
}> 

export interface EffectiveBiteOpts<State, Trigger> {
    mode?: string
    onStart?: (trigger: DispatcherType<Trigger>) => void
    onError?: (trigger: DispatcherType<Trigger>) => void
    onDone?: (trigger: DispatcherType<Trigger>) => void
    initReducer?: (state: State, payload: any) => void
    doneReducer?:  (state: State, payload: any) => void
    errorReducer?: (state: State, payload: any) => void
}


export const effectiveBite =  <ITrigger, IRootTrigger, IState, IRootState, K extends keyof ITrigger>(
            promise, 
            name: string, 
            opts?: EffectiveBiteOpts<IState, ITrigger>
        ) => {
    const defaultStartReducer = (state: IState, payload: any) => {
        state[name].input = payload
        state[name].loading = true
    }

    const defaultDoneReducer = (state: IState, payload: any) => {
        state[name].loading = false
        state[name].loaded = true
        state[name].data = payload
    }

    const defaultErrorReducer = (state: IState, payload: any) => {
        state[name].loading = false
        state[name].error = payload 
    }
    
    return   Bite<ITrigger, IRootTrigger, IState, IRootState, K>({
        'init':  opts && opts.initReducer ?opts.initReducer  : defaultStartReducer,
        'done':   opts && opts.doneReducer ? opts.doneReducer: defaultDoneReducer,
        'error':   opts && opts.errorReducer ? opts.errorReducer : defaultErrorReducer
    } as any, {
        'triggerStatus': 'init',
        'customOpts': {
            promise, 
            onStart: opts && opts.onStart?  opts.onStart: null, 
            onError: opts && opts.onError ? opts.onError: null,
            onDone: opts && opts.onDone ? opts.onDone: null
        }, 
        'updateOn': [name],
        'canTrigger': [name],
        'instance': opts &&  opts.mode ?  opts.mode as any  : 'stable',
        'script': EffectScript
    } as any) as any
}

export const effectiveInitialState = <I, D, E>(state?: EffectiveState<I, D, E>): EffectiveState<I, D, E>  => {
    return {
        'data': state && state.data ? state.data : null ,
        'loading': state && state.loading ?state.loading: false ,
        'loaded': state && state.loaded ? state.loaded: false,
    }
}


class EffectScript{
 
    constructor(private opts) {}

    public async init (args) {
        const co = this.opts.customOpts
        try {
            if(co && co.onStart) {
                co.onStart(this.opts.trigger)
            }
            const result = await this.opts.customOpts.promise()
            this.opts.setStatus('done',result);
            if(co &&  co.onDone) {
                co.onDone(this.opts.trigger)
            }
        } catch (err) {
            this.opts.setStatus('error', err);
            if(co && co.onError) {
                co.onError(this.opts.trigger)
            }
        }
        finally {
            this.opts.drop()
        }
    }

}