import React from 'react'
import { StoreContext } from './constext'


export const ReflexProvider = (props) => {

    return (<StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>)

}