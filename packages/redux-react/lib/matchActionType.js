import { getTriggerAndStatus } from "./getTriggerAndStatus";
export function matchActionType(actionType, updateOn) {
    var _a = getTriggerAndStatus(actionType), trigger = _a.trigger, status = _a.status;
    if (updateOn.length === 0) {
        return true;
    }
    var matchedTrigger = updateOn.find(function (t) {
        var firstKey = Object.keys(t)[0];
        return t === trigger || firstKey === trigger;
    });
    if (matchedTrigger) {
        if (typeof matchedTrigger === 'string') {
            return true;
        }
        else if (matchedTrigger[Object.keys(matchedTrigger)[0]] === status) {
            return true;
        }
    }
}
//# sourceMappingURL=matchActionType.js.map