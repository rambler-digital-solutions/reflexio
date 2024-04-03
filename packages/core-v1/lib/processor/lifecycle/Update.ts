import {getActionType, getTriggerAndStatus} from '../../utils';

export function BeforeUpdate(instance, state, action, reducers, sliceName) {
  //const { trigger, status } = getTriggerAndStatus(actionType);

  //const reducer = pickReducer(reducers, trigger, status);
  const actionType = action.type;
  const actionPayload = action.payload;
  let propagate = true;

  const stopPropagate = () => {
    propagate = false;
  };

  if (instance.watch) {
    const {trigger, status} = getTriggerAndStatus(actionType);
    const updateArgs = {
      payload: actionPayload,
      trigger,
      status,
      source: action.source,
      sourceSlice: sliceName,
      hangOn: stopPropagate,
    };

    if (instance.updatable) {
      const foundKey = Object.keys(instance.updatable).find(
        (u) => u === getActionType(updateArgs.trigger, updateArgs.status),
      );

      if (foundKey) {
        instance[instance.updatable[foundKey]](updateArgs);
      } else {
        instance.watch(updateArgs);
      }
    } else {
      instance.watch(updateArgs);
    }
  }

  return propagate;
}
