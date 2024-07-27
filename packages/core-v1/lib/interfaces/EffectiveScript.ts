import { WatchArgsType,ScriptOptsType, InitArgsType, TriggerPhaseKeys} from "../types";


export abstract class EffectiveScript<RTg, RSt, Bitename extends keyof RTg, PhK extends TriggerPhaseKeys<RTg, Bitename>, Inj=unknown> {

    constructor (opts) {
        this.opts = opts
    }    

    protected opts: ScriptOptsType<RTg, RSt, Bitename, Inj>;

    abstract watch?(args: WatchArgsType<RTg, Bitename>): void

    abstract afterEffects?(args: WatchArgsType<RTg, Bitename>): void

    abstract init(args: InitArgsType<RTg, Bitename, PhK>): void


}