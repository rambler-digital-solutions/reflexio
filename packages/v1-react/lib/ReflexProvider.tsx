import React from 'react'
import { StoreContext } from './context'
import { useSystem } from '@reflexio/core-v1/lib/System';

export const ReflexProvider = (props) => {
    const system = useSystem();

    return (<StoreContext.Provider value={{store: props.store, system}}>
            {props.children}
        </StoreContext.Provider>)

}