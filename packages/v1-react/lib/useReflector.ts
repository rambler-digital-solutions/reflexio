import {useState, useEffect, useContext} from 'react'
import { matchActionType } from './matchActionType';
import { StoreContext } from './context';
import { UpdateOnType } from '@reflexio/core-v1/lib/types';


export type UseReflectorType = <Tr, K, S>(
    mapState: (args: K)=> S, 
    condition: UpdateOnType<Tr>,
    shouldUpdate?: (payload: any) => boolean
) => S


export const useReflector: UseReflectorType = (
    mapState, 
    condition,
    shouldUpdate) => {
const ctx = useContext(StoreContext)
const store = ctx.store;
const system = ctx.system;
const initialState = mapState(store.getState())
const [state, setState] = useState(initialState);

let c;
if(typeof c === 'function') {
    //@ts-ignore
    c = condition();
}
else {
    c = condition;
}

useEffect(()=> {
const subscribtion =  store.subscribe(()=> {
    const task = system.taksQueue.getCurrentTask()
    if(!c.length || 
            (task && matchActionType(task.type, c))
        ) {
            if(shouldUpdate) {
                if(shouldUpdate(task.payload)) {
                    setState(mapState(store.getState()))  
                }
            }
            else {
                setState(mapState(store.getState()))
            }
    }
})
return () => subscribtion()
},[])

return state

}

