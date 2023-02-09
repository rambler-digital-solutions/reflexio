import { ReactElement } from "react"
import { IState, ITriggers } from "src/_redux/types"
import { Bite, Slice } from "../../../../dist/lib"
import { TriggerPhaseWrapper } from "../../../../dist/lib/types"
import { OpenPopupScript } from "./scripts/OpenPopup.script"



export interface IPopupState {
    isOpen: boolean
    content: string | ReactElement
}

export interface IPopupTriggers {
    openPopup: TriggerPhaseWrapper<{
        init:  string | JSX.Element,
        open: null
        close: null
    }> 
}

export const popupInitialState: IPopupState = {
    'content': '',
    'isOpen': false
}

const openPopupBite = Bite<IPopupTriggers, ITriggers, IPopupState, IState,'openPopup'>({
    'init': (state, payload) => {state.content = payload},
    'open': (state, payload) => { state.isOpen = true},
    'close': (state, payload) => {state.isOpen = false} 
},{
    'canTrigger': ['openPopup'],
    'updateOn': ['openPopup'],
    'instance': 'stable',
    'script': OpenPopupScript,
    'triggerStatus': 'init'
})


export const popupSlice = Slice<IPopupTriggers, ITriggers, IPopupState, IState>('popup', {
    'openPopup': openPopupBite
}, popupInitialState)