import React, {createContext} from 'react'


export const StoreContext = createContext(null);

export const ReflexProvider = (props) => {

    return (<StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>)

}