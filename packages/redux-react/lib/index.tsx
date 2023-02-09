import React from 'react';
import {useState, useEffect} from 'react'
import {store} from '.'
import {Queue} from '.'
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
        const initialState = store.getState().module
        const [state, setState] = useState(initialState);

        useEffect(()=> {
            store.subscribe(()=> {
                if(Queue.includes(condition)) {
                    setState(store.getState().module)
                }
            })
        },[])

        return (<WrappedComponent {...props}/>)
    }

}



