import {getTriggerAndStatus} from '../utils';

export function matchUpdateTrigger(configs, actionType) {
  const {trigger, status} = getTriggerAndStatus(actionType);

  return Object.keys(configs)
    .filter((c) => {
      const conf = configs[c];
      const watchScope = conf.watchScope;

      if (watchScope) {
        if (watchScope.length === 0) {
          return true;
        }

        const matchedTrigger = watchScope.find((t) => {
          const [firstKey] = Object.keys(t);

          return t === trigger || firstKey === trigger;
        });

        if (typeof matchedTrigger === 'string') {
          return true;
        } else if (matchedTrigger) {
          const [firstKey] = Object.keys(matchedTrigger);
          const matchedStatus = matchedTrigger[firstKey];

          if (
            matchedStatus === status ||
            (Array.isArray(matchedStatus) && matchedStatus.includes(status))
          ) {
            return true;
          }
        }
      }

      return false;
    })
    .map((c) => ({
      config: configs[c],
      trigger: c,
    }));
}
