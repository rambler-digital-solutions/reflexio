import {getActionType} from '../../utils';

// eslint-disable-next-line import/no-unused-modules
export function Save(store, _config, system, uid) {
  //const canTrigger = config.config.canTrigger;

  return (actionType, actionStatus, actionArgs) => {
    const process = system.findProcessByUid(uid);

    if (process.length) {
      //if (canTrigger && canTrigger.includes(actionType)) {
      const combinedType = getActionType(actionType, actionStatus);

      store.dispatch({
        type: combinedType,
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
