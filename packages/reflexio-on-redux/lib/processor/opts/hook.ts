import { getActionType } from '../../utils';

export function Hook(store, config, system, uid) {
  const canTrigger = config.config.canTrigger;

  return (actionType, actionStatusStart, actionStatusStop, startPAyload, timeout) => {

    const combynedTypeStart = getActionType(actionType, actionStatusStart);
    const combynedTypeStop = getActionType(actionType, actionStatusStop);
    
    setTimeout(() => {
        store.dispatch({
            type: combynedTypeStart,
            payload: startPAyload,
        });
    }, 0)  
    return new Promise((resolve, reject)=> { 
        system.addWait(combynedTypeStop, {resolve, reject}, timeout);
    })
  };
}