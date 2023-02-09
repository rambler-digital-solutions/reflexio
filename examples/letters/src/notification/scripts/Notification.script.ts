import { ScriptUpdateArgsType } from "@seijs/redux-hang-on/lib/types";
import { IState, ITriggers } from "src/_redux/types";
import { ScriptOptsType, ScriptInitArgsType } from "../../../../../dist/lib/types";
import { INotificationState, INotificationTriggers } from "../notification.config";




export class NotificationScrit  {
    constructor(private opts: ScriptOptsType<INotificationTriggers,ITriggers,IState, 'showNotification'>) {}

    private timeout;

    public init(args: ScriptInitArgsType<INotificationTriggers, 'showNotification', 'init'>) {
        this.timeout = setTimeout(()=> {
            this.opts.trigger('showNotification', 'close', null);
        }, 2000)
    }

    public update(args: ScriptUpdateArgsType<INotificationTriggers, 'showNotification', 'close'>) {
        if(args.status === 'close') {
        if(this.timeout) {
            clearTimeout(this.timeout)
        }
    }
    }
}