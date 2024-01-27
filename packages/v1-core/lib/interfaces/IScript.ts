import { WatchArgsType,ScriptOptsType, InitArgsType, TriggerPhaseKeys} from "../types";


export abstract class  Script<RTg, RSt, Bitename extends keyof RTg, PhK extends TriggerPhaseKeys<RTg, Bitename>, CO=unknown> {


    abstract opts: ScriptOptsType<RTg, RSt, Bitename>;

    abstract watch(args: WatchArgsType<RTg, Bitename>): void

    abstract init(args: InitArgsType<RTg, Bitename, PhK>): void


}