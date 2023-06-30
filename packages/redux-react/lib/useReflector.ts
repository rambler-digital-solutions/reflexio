import React from 'react';
import {useState, useEffect, useContext} from 'react'
import { useSystem } from '../../reflexio-on-redux/lib';
import { matchActionType } from './matchActionType';
import { StoreContext } from './constext';
import { UpdateOnType } from '../../reflexio-on-redux/lib/types';

export const useReflector = <Triggers,K = unknown, S=unknown>(
            mapState: (args: K)=> S, 
            condition: UpdateOnType<Triggers>,
            shouldUpdate?: (payload: any) => boolean
        ): S => {
    const system = useSystem();
    const store = useContext(StoreContext)
    const initialState = mapState(store.getState())
    const [state, setState] = useState(initialState);

    useEffect(()=> {
        const subscribtion =  store.subscribe(()=> {
            const task = system.taksQueue.getCurrentTask()
            if(!condition.length || 
                    (task && matchActionType(task.type, condition))
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



