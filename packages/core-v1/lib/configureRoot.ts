import {
  createStore,
  applyMiddleware,
  compose,
  type Reducer,
  type Middleware,
} from 'redux';
import {useSystem} from './System';

export function configureRoot(args: {
  rootReducer: Reducer;
  middlewares: Array<Middleware>;
}) {
  const store = createStore(
    args.rootReducer,
    compose(applyMiddleware(...args.middlewares)),
  );
  const system = useSystem();

  store.subscribe(() => {
    system.afterHandlers.forEach((s) => s());
  });
  // store.subscribe(() => {
  //   // const nextTask = system.taksQueue.popTask();
  //   // if(nextTask) {
  //   //     store.dispatch({
  //   //         type:
  //   //     })
  //   // }
  // });

  return store;
}
