import {useContext} from 'react'
import {SsrContext} from '../provider'
import { App } from '../core/app'
import { isBackend } from '../utils'
import { Effect } from '../core/effect'

export const useServerEffect = (cb: ()=> void, id: string) => {
    if(isBackend()) {
        const {app}: {app: App} = useContext(SsrContext)
        const isCalled = app.getEffectCalledState(id)
        if(!isCalled) {
            const effect = new Effect({id})
            app.effectCollection.addEffect(effect)
            app.setEffectCalledState(id)
        }
    }
}