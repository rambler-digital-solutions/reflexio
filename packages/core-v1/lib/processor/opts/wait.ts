import {getActionType} from '../../utils';

export function Wait(_store, _config, system, _uid) {
  //const canTrigger = config.config.canTrigger;

  return (actionType, actionStatus, timeout) => {
    const combinedType = getActionType(actionType, actionStatus);

    return new Promise((resolve, reject) => {
      system.addWait(combinedType, {resolve, reject}, timeout);
    });
  };
}
