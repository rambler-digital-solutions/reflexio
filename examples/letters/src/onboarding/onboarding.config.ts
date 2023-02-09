import { ReactElement } from "react"
import { IState, ITriggers } from "src/_redux/types"
import { Bite, Slice } from "../../../../dist/lib"
import { TriggerPhaseWrapper } from "../../../../dist/lib/types"
import { OnboardScript } from "./scripts/Onboard.script"



export interface IOnboardingState {
    stage: number
}

export interface IOnboardingTriggers {
    onboard: TriggerPhaseWrapper<{
        init: null,
        start: null
        next: null
        close: null
    }> 
}

export const onboardingInitialState: IOnboardingState = {
    'stage': 0
}

const onboardBite = Bite<IOnboardingTriggers, ITriggers, IOnboardingState, IState,'onboard'>({
    'init': null,
    'start': (state, payload) => {state.stage = 1},
    'close': (state, payload) =>  {state.stage = 0},
    'next': (state, payload) => {state.stage+=1}
},{
    'canTrigger': ['openPopup'],
    'updateOn': [],
    'instance': 'stable',
    'script': OnboardScript,
    'triggerStatus': 'init'
})


export const popupSlice = Slice<IOnboardingTriggers, ITriggers, IOnboardingState, IState>('onboarding', {
    'onboard': onboardBite
}, onboardingInitialState)