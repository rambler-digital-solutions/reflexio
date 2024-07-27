
import { getActionType } from '../../utils';

export function SetStateNoEffect(store, config, system, uid, sourceSlice) {
 
  return (status, args) => {
    const process = system.findProcessByUid(uid);
    if (process.length) {
        store.dispatch({
          type: getActionType(config.trigger, status),
          payload: args,
          source: `${config.trigger}:${uid}`,
          sourceSlice,
          opts: {
            notEffect: true,
            noInit: true,
            noUpdate: true,
          },
      });
    }
  };
}
