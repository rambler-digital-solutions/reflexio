import { getActionType } from '../../utils';

export function Wait(store, config, system, uid) {
  const canTrigger = config.config.canTrigger;

  return (actionType, actionStatus, timeout) => {

    const combynedType = getActionType(actionType, actionStatus);
    return new Promise((resolve, reject)=> { 
        system.addWait(combynedType, {resolve, reject}, timeout);
    })
  };
}
