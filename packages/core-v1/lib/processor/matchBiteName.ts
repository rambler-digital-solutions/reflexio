import {getTriggerAndStatus} from '../utils';

export function matchBiteName(config, actionType) {
  const {trigger, status} = getTriggerAndStatus(actionType);

  return Boolean(config[trigger]);
}
