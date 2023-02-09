import { IState, ITriggers } from "src/_redux/types";
import { ScriptInitArgsType, ScriptOptsType, ScriptUpdateArgsType } from "../../../../../dist/lib/types";
import { IPopupTriggers } from "../popup.config";



export class OpenPopupScript {
    constructor(private opts: ScriptOptsType<IPopupTriggers,ITriggers,IState, 'openPopup'>) {}

    public init(args: ScriptInitArgsType<IPopupTriggers, 'openPopup', 'init'>) {
        console.log(this.opts.getCurrentState().popup)
       // here we can implement popup queue
    }

    public update(args: ScriptUpdateArgsType<IPopupTriggers, 'openPopup', 'close'>) {
    
    }

}