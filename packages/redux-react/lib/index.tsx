import React from 'react';
import {useState, useEffect} from 'react'
import { useSystem } from '../../reflexio-on-redux/dist';
import { matchActionType } from './matchActionType';

export const connector = (condition) => (WrappedComponent) => {



    /* Flow
    ** When trigger - on Next(actio) => set current action type to buffer replacing previous value
    ** In listener check the value in buffer and compare with arguments 
    ** setState or ingore
    */

    /* Task -1 => set to WaitBuffer to lastPlace
    ** In listener check wait buffer - pick first and remove 
    ** 
    */
    return (props) => {
        const system = useSystem();
        const store: any = {};// get from context
        const initialState = store.getState().module
        const [state, setState] = useState(initialState);



        useEffect(()=> {
            store.subscribe(()=> {
                const task = system.taksQueue.getCurrentTask()
                if(task && matchActionType(task, condition)) {
                    setState(store.getState().module)
                }
            })
        },[])

        return <WrappedComponent state={state} props={props} />
    }

}



