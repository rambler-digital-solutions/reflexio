export var getTriggerAndStatus = function (actionType) {
    var parts = actionType.split('/');
    return {
        trigger: parts[0],
        status: parts[1] || null
    };
};
//# sourceMappingURL=getTriggerAndStatus.js.map