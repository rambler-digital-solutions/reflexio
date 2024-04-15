import {getTriggerAndStatus} from '../utils';

export function matchInitTrigger(configs, actionType) {
  const {trigger, status} = getTriggerAndStatus(actionType);
  const config = configs[trigger];

  if (config && (!config.initOn || config.initOn === status)) {
    return {config, trigger};
  }

  return null;
}
