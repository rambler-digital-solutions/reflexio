import {getActionType} from '../../utils';

export function Save(store, config, system, uid) {
  //const canTrigger = config.config.canTrigger;

  return (actionType, actionStatus, actionArgs) => {
    const process = system.findProcessByUid(uid);

    if (process.length) {
      //if (canTrigger && canTrigger.includes(actionType)) {
      const combynedType = getActionType(actionType, actionStatus);

      store.dispatch({
        type: combynedType,
        payload: actionArgs,
        opts: {
          noInit: true,
        },
      });
      // } else if (system.config.env === 'dev') {
      //   console.log(
      //     `WARNING!: ${config.trigger} can not trigger ${actionType}`
      //   );
      // }
    }
  };
}
