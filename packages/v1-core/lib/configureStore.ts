import {createStore, applyMiddleware, compose} from 'redux'
import { useSystem } from './System';


export function configureStore(rootReducer, middlewares) {
    const store = createStore(
        rootReducer,
        compose(applyMiddleware(...middlewares))
    );
    const system = useSystem();

    store.subscribe(() => {
        system.afterEffects.handleAfterEffect(store.dispatch)
    })
}