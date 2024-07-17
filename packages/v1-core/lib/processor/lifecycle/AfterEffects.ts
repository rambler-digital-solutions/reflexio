import { getTriggerAndStatus } from "../../utils";

export function AfterEffects (instance, action, sliceName) {
    const actionPayload = action.payload;
    const effectType = actionPayload.actionType;
    const effectPayload = actionPayload.payload;
    if(instance.afterEffects) {
        const { trigger, status } = getTriggerAndStatus(effectType);
        const afterEffectsArgs = {
            payload: effectPayload,
            trigger,
            status,
            source: action.source,
            sourceSlice: sliceName,
          };
          instance.afterEffects(afterEffectsArgs)

    }

}