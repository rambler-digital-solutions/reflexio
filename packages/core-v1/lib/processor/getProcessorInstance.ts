import { getActionType } from '../utils';

export function getInstance(config, trigger, system) {
  const actionType = getActionType(trigger, config.initOn);

  return system.findProcess(actionType);
}
