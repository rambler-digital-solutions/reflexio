import { getActionType } from '../../utils';

export function Trigger(store, config, system, uid, sourceSlice) {
  const sourceTrigger = config.trigger;

  return (actionType, actionStatus, actionArgs) => {
    const process = system.findProcessByUid(uid);
    if (process.length) {
      //if (canTrigger && canTrigger.includes(actionType)) {
        const combynedType = getActionType(actionType, actionStatus);
        store.dispatch({
          type: combynedType,
          payload: actionArgs,
          source: `${sourceTrigger}:${uid}`,
          sourceSlice,
        });
      // } else if (system.config.env === 'dev') {
      //   console.log(
      //     `WARNING!: ${config.trigger} can not trigger ${actionType}`
      //   );
      // }
    }
  };
}
