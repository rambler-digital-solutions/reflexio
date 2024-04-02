import {getTriggerAndStatus} from './getTriggerAndStatus';

export function matchActionType(actionType, updateOn) {
  const {trigger, status} = getTriggerAndStatus(actionType);

  if (updateOn.length === 0) {
    return true;
  }

  const matchedTrigger = updateOn.find((t) => {
    const firstKey = Object.keys(t)[0];

    return t === trigger || firstKey === trigger;
  });

  if (!matchedTrigger) {
    return false;
  }

  if (typeof matchedTrigger === 'string') {
    return true;
  }

  const matchedStatus = matchedTrigger[Object.keys(matchedTrigger)[0]];

  if (
    matchedStatus === status ||
    (Array.isArray(matchedStatus) && matchedStatus.includes(status))
  ) {
    return true;
  }
}
