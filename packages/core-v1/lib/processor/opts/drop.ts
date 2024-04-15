import {getActionType} from '../../utils';

export function Drop(system, config) {
  const actionType = getActionType(config.trigger, config.config.initOn);

  return () => {
    system.downProcess(actionType);
  };
}
