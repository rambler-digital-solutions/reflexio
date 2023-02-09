import { getActionType } from '../../utils';

export function Drop(system, config) {
  const actionType = getActionType(config.trigger, config.config.triggerStatus);

  return () => {
    system.downProcess(actionType);
  };
}
