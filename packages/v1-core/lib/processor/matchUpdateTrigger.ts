import { getTriggerAndStatus } from '../utils';

export function matchUpdateTrigger(configs, actionType) {
  const { trigger, status } = getTriggerAndStatus(actionType);

  return Object.keys(configs)
    .filter((c) => {
      const conf = configs[c];
      const watchScope = conf.watchScope;
      if (watchScope) {
        if (watchScope.length === 0) {
          return true;
        }
        const matchedTrigger = watchScope.find((t) => {
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
          } else if (
            Array.isArray(matchedTrigger[Object.keys(matchedTrigger)[0]])
          ) {
            if (
              matchedTrigger[Object.keys(matchedTrigger)[0]].includes(status)
            ) {
              return true;
            }
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
