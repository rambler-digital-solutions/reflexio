import { ScriptAbstractUpdateArgsType, ScriptAbstractOptsType, ScriptOptsType, ScriptUpdateArgsType } from "../types";


export abstract class  Script<RTg, RSt, Bitename extends keyof RTg, CO> {


    abstract opts: ScriptAbstractOptsType<RTg, RSt, Bitename>;

    abstract update(args: ScriptAbstractUpdateArgsType<RTg, Bitename>): void

    abstract init(args: ScriptAbstractUpdateArgsType<RTg, Bitename>): void


}