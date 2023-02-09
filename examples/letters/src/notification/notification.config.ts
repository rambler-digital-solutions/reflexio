import { IState, ITriggers } from "src/_redux/types";
import { Bite, Slice } from "../../../../dist/lib";
import { TriggerPhaseWrapper } from "../../../../dist/lib/types";
import { INotification } from "./interfaces/Notification.interface";
import { NotificationScrit } from "./scripts/Notification.script";




export interface INotificationState {
    notifications: Array<INotification>
}

export interface INotificationTriggers {
    showNotification: TriggerPhaseWrapper<{
        init: string,
        close: null
    }>

}

export const notificationInitialState: INotificationState = {
    notifications: []
}



export const showNotificationBite = Bite<INotificationTriggers, ITriggers, INotificationState, IState, 'showNotification' >(
    {
        'init': (state, payload) => { state.notifications = [{content: payload}]},
        'close': (state, payload) => { state.notifications = [] },
    }, 
    {
    'script': NotificationScrit,
    'instance': 'stable',
    'triggerStatus': 'init',
    'updateOn': ['showNotification'],
    'canTrigger': ['showNotification']
}) 


export const notificationSlice = Slice<INotificationTriggers, ITriggers, INotificationState, IState>(
    'notification',
    {
        'showNotification':showNotificationBite
    },
    notificationInitialState
)