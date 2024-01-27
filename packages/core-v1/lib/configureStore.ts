import {createStore, applyMiddleware, compose} from 'redux'
import { useSystem } from './System';


export function configureStore(rootReducer, middlewares) {
    const store = createStore(
        rootReducer,
        compose(applyMiddleware(...middlewares))
    );
    const system = useSystem();

    store.subscribe(() => {
        system.afterHandlers.forEach( s => s())
    })
    store.subscribe(() => {
        // const nextTask = system.taksQueue.popTask();
        // if(nextTask) {
        //     store.dispatch({
        //         type: 
        //     })
        // }
    })
}