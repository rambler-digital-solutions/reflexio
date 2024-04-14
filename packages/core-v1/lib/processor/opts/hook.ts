import {getActionType} from '../../utils';

export function Hook(store, config, system, uid) {
  //const canTrigger = config.config.canTrigger;
  const sourceTrigger = config.trigger;

  return (
    actionType,
    actionStatusStart,
    actionStatusStop,
    startPAyload,
    timeout,
  ) => {
    const combinedTypeStart = getActionType(actionType, actionStatusStart);
    const combinedTypeStop = getActionType(actionType, actionStatusStop);

    setTimeout(() => {
      store.dispatch({
        type: combinedTypeStart,
        payload: startPAyload,
        source: `${sourceTrigger}:${uid}`,
      });
    }, 0);

    return new Promise((resolve, reject) => {
      system.addWait(combinedTypeStop, {resolve, reject}, timeout);
    });
  };
}
