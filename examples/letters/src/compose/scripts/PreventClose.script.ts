
import { IState, ITriggers } from "src/_redux/types";
import { ScriptInitArgsType, ScriptOptsType, ScriptUpdateArgsType } from "../../../../../dist/lib/types";
import { IComposeTriggers } from "../compose.config";



export class PreventCloseScript {
    constructor(private opts: ScriptOptsType<IComposeTriggers,ITriggers,IState, 'preventClose'>) {}

    private body: string = ''
    private subject: string = ''
    private passCb: ()=>void

    public init(args: ScriptInitArgsType<IComposeTriggers, 'preventClose', 'init'>) {
        console.log('PREVENT INIT')
    }

    private handleCheck (args:ScriptUpdateArgsType<IComposeTriggers, 'preventClose', 'checkReq'> ) {
        this.passCb = args.payload.passCb
        if (typeof args.payload.subject === 'undefined' && typeof args.payload.body === 'undefined') {
            this.opts.trigger('preventClose', 'checkResp', true)
        }
        else if (args.payload.subject !== this.subject || args.payload.body !== this.body) {
            console.log('COMPARE')
            console.log(args.payload.subject)
            console.log(args.payload.body)
            console.log(this.body)
            console.log(this.subject)
            this.opts.trigger('preventClose', 'checkResp', false)
        }
        else {
           this.opts.trigger('preventClose', 'checkResp', true)
        }   
    }
    private handleClear (args:ScriptUpdateArgsType<IComposeTriggers, 'preventClose', 'clear'> ) {
        if(this.passCb) {
            this.passCb()
        } 
    }
    private handleSet (args:ScriptUpdateArgsType<IComposeTriggers, 'preventClose', 'set'> ) {
        this.body = args.payload.body
        this.subject = args.payload.subject
    }

    public update(args: ScriptUpdateArgsType<IComposeTriggers, 'preventClose', 'checkReq' | 'clear' | 'set'>) {
        if(args.status === 'checkReq') {
            this.handleCheck(args as any)
        }
        if(args.status === 'clear') {
            this.handleClear(args as any)
        }
        if(args.status === 'set') {
            this.handleSet(args as any)
        }
    }

}