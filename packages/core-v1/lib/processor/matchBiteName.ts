import {getTriggerAndStatus} from '../utils';

export function matchBiteName(config, actionType) {
  const {trigger} = getTriggerAndStatus(actionType);

  return Boolean(config[trigger]);
}
