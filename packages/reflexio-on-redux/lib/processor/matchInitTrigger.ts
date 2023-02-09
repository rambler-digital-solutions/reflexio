import { getTriggerAndStatus } from '../utils';

export function matchInitTrigger(config, actionType) {
  const { trigger, status } = getTriggerAndStatus(actionType);
  if (config[trigger]) {
    if (!config[trigger]['triggerStatus']) {
      return { config: config[trigger], trigger };
    } else if (config[trigger] && config[trigger]['triggerStatus'] === status) {
      return { config: config[trigger], trigger };
    }
  }

  return null;
}
