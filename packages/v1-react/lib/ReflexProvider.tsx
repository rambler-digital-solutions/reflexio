import React from 'react'
import { StoreContext } from './context'
import {Store} from 'redux';
import { useSystem } from '../../v1-core/lib/System';

export const ReflexProvider = (props) => {
    const system = useSystem();

    return (<StoreContext.Provider value={{store: props.store, system}}>
            {props.children}
        </StoreContext.Provider>)

}