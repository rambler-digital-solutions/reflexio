import { getTriggerAndStatus } from '../utils';

export function matchUpdateTrigger(configs, actionType) {
  const { trigger, status } = getTriggerAndStatus(actionType);

  return Object.keys(configs)
    .filter((c) => {
      const conf = configs[c];
      const updateOn = conf.updateOn;
      if (updateOn) {
        if (updateOn.length === 0) {
          return true;
        }
        const matchedTrigger = updateOn.find((t) => {
          const firstKey = Object.keys(t)[0];

          return t === trigger || firstKey === trigger;
        });
        if (matchedTrigger) {
          if (typeof matchedTrigger === 'string') {
            return true;
          } else if (
            matchedTrigger[Object.keys(matchedTrigger)[0]] === status
          ) {
            return true;
          }
        }
      }
    })
    .map((c) => ({
      config: configs[c],
      trigger: c,
    }));
}
