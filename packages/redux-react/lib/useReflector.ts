import React from 'react';
import {useState, useEffect, useContext} from 'react'
import { useSystem } from '../../reflexio-on-redux/lib';
import { matchActionType } from './matchActionType';
import { StoreContext } from './constext';
import { UpdateOnType } from '../../reflexio-on-redux/lib/types';



export const useReflector = <Tr, K, S>(
    mapState: (args: K)=> S, 
    condition: ((args?: Tr) => UpdateOnType<Tr>) | Array<any>,
    shouldUpdate?: (payload: any) => boolean
): S => {
const system = useSystem();
const store = useContext(StoreContext)
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
    if(c.length || 
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

