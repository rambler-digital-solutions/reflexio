import { getTriggerAndStatus } from "./getTriggerAndStatus";




export function matchActionType(actionType, updateOn) {
    const {trigger, status} = getTriggerAndStatus(actionType);
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