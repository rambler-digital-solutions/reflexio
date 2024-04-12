import {getTriggerAndStatus} from '@reflexio/core-v1';

export function matchActionType(actionType, updateOn) {
  const {trigger, status} = getTriggerAndStatus(actionType);

  if (updateOn.length === 0) {
    return true;
  }

  const matchedTrigger = updateOn.find((t) => {
    const [firstKey] = Object.keys(t);

    return t === trigger || firstKey === trigger;
  });

  if (!matchedTrigger) {
    return false;
  }

  if (typeof matchedTrigger === 'string') {
    return true;
  }

  const [firstKey] = Object.keys(matchedTrigger);
  const matchedStatus = matchedTrigger[firstKey];

  if (
    matchedStatus === status ||
    (Array.isArray(matchedStatus) && matchedStatus.includes(status))
  ) {
    return true;
  }
}
